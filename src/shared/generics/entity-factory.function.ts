import { isNil } from '@nestjs/common/utils/shared.utils';

export function entityFactory <T extends object>(entityType: new (...args: any[]) => T, data:T): T {
  if( isNil( entityType ) || isNil( data )) {
    throw new Error("Invalid argument provider for entityFactory");
  }

  const entity = new entityType();

  Object.keys( data )
    .map( (key: string) => {
      entity[key] = data[key];
    });

  return entity;
}