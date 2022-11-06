export abstract class BaseMapper<ENTITY, DTO>{
    abstract map(entity: ENTITY) : DTO
    mapArray(entities: Array<ENTITY>) : Array<DTO>{
        return entities.map(entity => this.map(entity));
    }
}