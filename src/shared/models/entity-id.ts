export class EntityId {
  private readonly idValue;

  protected constructor(idValue?: number) {
    this.idValue = idValue;
  }

  static generate(): EntityId {
    return new EntityId();
  }

  static create(idValue: number, propertyName = 'id'): EntityId {
    return new EntityId(idValue);
  }

  getIdValue(): number {
    return this.idValue;
  }

  equals(to: EntityId): boolean {
    return this.idValue === to.getIdValue();
  }
}