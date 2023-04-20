import { Result } from "../result/result";
import { IException } from "../interfaces/generics/exception.interface";


export const Success = <T>(value?: T): Result<T> => Result.success(value);

export const Failed = (...errors: IException[]): Result<any> => Result.failed(...errors);

export const NotFound = (): Result<any> => Result.notFound();