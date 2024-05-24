import {
    ArgumentMetadata,
    BadRequestException,
    Injectable,
    PipeTransform,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import {
    validate,
    ValidationError as ClassValidatorValidationError,
} from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, { metatype }: ArgumentMetadata) {
        if (!metatype || !this.isValidationNeeded(metatype)) {
            return value;
        }

        const object = plainToInstance(metatype, value);
        const errors = await validate(object);

        if (errors.length > 0) {
            throw new BadRequestException(this.formatErrors(errors));
        }

        return value;
    }

    private isValidationNeeded(metatype: Function): boolean {
        const types: Function[] = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }

    private formatErrors(errors: ClassValidatorValidationError[]): any[] {
        return errors.map((error) => {
            const constraints = Object.keys(error.constraints);
            const message = constraints
                .map((constraint) => error.constraints[constraint])
                .join(', ');
            return {
                property: error.property,
                message,
            };
        });
    }
}
