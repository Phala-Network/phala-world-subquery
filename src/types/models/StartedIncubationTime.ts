// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type StartedIncubationTimeProps = Omit<StartedIncubationTime, NonNullable<FunctionPropertyNames<StartedIncubationTime>>>;

export class StartedIncubationTime implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public collectionId: number;

    public nftId: number;

    public owner: string;

    public startTime: bigint;

    public hatchTime: bigint;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save StartedIncubationTime entity without an ID");
        await store.set('StartedIncubationTime', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove StartedIncubationTime entity without an ID");
        await store.remove('StartedIncubationTime', id.toString());
    }

    static async get(id:string): Promise<StartedIncubationTime | undefined>{
        assert((id !== null && id !== undefined), "Cannot get StartedIncubationTime entity without an ID");
        const record = await store.get('StartedIncubationTime', id.toString());
        if (record){
            return StartedIncubationTime.create(record as StartedIncubationTimeProps);
        }else{
            return;
        }
    }


    static async getByCollectionId(collectionId: number): Promise<StartedIncubationTime[] | undefined>{
      
      const records = await store.getByField('StartedIncubationTime', 'collectionId', collectionId);
      return records.map(record => StartedIncubationTime.create(record as StartedIncubationTimeProps));
      
    }

    static async getByNftId(nftId: number): Promise<StartedIncubationTime[] | undefined>{
      
      const records = await store.getByField('StartedIncubationTime', 'nftId', nftId);
      return records.map(record => StartedIncubationTime.create(record as StartedIncubationTimeProps));
      
    }


    static create(record: StartedIncubationTimeProps): StartedIncubationTime {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new StartedIncubationTime(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
