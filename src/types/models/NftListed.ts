// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type NftListedProps = Omit<NftListed, NonNullable<FunctionPropertyNames<NftListed>>>;

export class NftListed implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public createdAt: Date;

    public owner: string;

    public collectionId: number;

    public nftId: number;

    public amount?: bigint;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save NftListed entity without an ID");
        await store.set('NftListed', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove NftListed entity without an ID");
        await store.remove('NftListed', id.toString());
    }

    static async get(id:string): Promise<NftListed | undefined>{
        assert((id !== null && id !== undefined), "Cannot get NftListed entity without an ID");
        const record = await store.get('NftListed', id.toString());
        if (record){
            return NftListed.create(record as NftListedProps);
        }else{
            return;
        }
    }


    static async getByOwner(owner: string): Promise<NftListed[] | undefined>{
      
      const records = await store.getByField('NftListed', 'owner', owner);
      return records.map(record => NftListed.create(record as NftListedProps));
      
    }

    static async getByCollectionId(collectionId: number): Promise<NftListed[] | undefined>{
      
      const records = await store.getByField('NftListed', 'collectionId', collectionId);
      return records.map(record => NftListed.create(record as NftListedProps));
      
    }

    static async getByNftId(nftId: number): Promise<NftListed[] | undefined>{
      
      const records = await store.getByField('NftListed', 'nftId', nftId);
      return records.map(record => NftListed.create(record as NftListedProps));
      
    }


    static create(record: NftListedProps): NftListed {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new NftListed(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
