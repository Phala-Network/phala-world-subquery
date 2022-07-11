// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type NftUnlistedProps = Omit<NftUnlisted, NonNullable<FunctionPropertyNames<NftUnlisted>>>;

export class NftUnlisted implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public createdAt: Date;

    public owner: string;

    public collectionId: number;

    public nftId: number;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save NftUnlisted entity without an ID");
        await store.set('NftUnlisted', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove NftUnlisted entity without an ID");
        await store.remove('NftUnlisted', id.toString());
    }

    static async get(id:string): Promise<NftUnlisted | undefined>{
        assert((id !== null && id !== undefined), "Cannot get NftUnlisted entity without an ID");
        const record = await store.get('NftUnlisted', id.toString());
        if (record){
            return NftUnlisted.create(record as NftUnlistedProps);
        }else{
            return;
        }
    }


    static async getByOwner(owner: string): Promise<NftUnlisted[] | undefined>{
      
      const records = await store.getByField('NftUnlisted', 'owner', owner);
      return records.map(record => NftUnlisted.create(record as NftUnlistedProps));
      
    }

    static async getByCollectionId(collectionId: number): Promise<NftUnlisted[] | undefined>{
      
      const records = await store.getByField('NftUnlisted', 'collectionId', collectionId);
      return records.map(record => NftUnlisted.create(record as NftUnlistedProps));
      
    }

    static async getByNftId(nftId: number): Promise<NftUnlisted[] | undefined>{
      
      const records = await store.getByField('NftUnlisted', 'nftId', nftId);
      return records.map(record => NftUnlisted.create(record as NftUnlistedProps));
      
    }


    static create(record: NftUnlistedProps): NftUnlisted {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new NftUnlisted(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
