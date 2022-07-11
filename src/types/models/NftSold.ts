// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type NftSoldProps = Omit<NftSold, NonNullable<FunctionPropertyNames<NftSold>>>;

export class NftSold implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public createdAt: Date;

    public sender: string;

    public buyer: string;

    public collectionId: number;

    public nftId: number;

    public price: bigint;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save NftSold entity without an ID");
        await store.set('NftSold', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove NftSold entity without an ID");
        await store.remove('NftSold', id.toString());
    }

    static async get(id:string): Promise<NftSold | undefined>{
        assert((id !== null && id !== undefined), "Cannot get NftSold entity without an ID");
        const record = await store.get('NftSold', id.toString());
        if (record){
            return NftSold.create(record as NftSoldProps);
        }else{
            return;
        }
    }


    static async getBySender(sender: string): Promise<NftSold[] | undefined>{
      
      const records = await store.getByField('NftSold', 'sender', sender);
      return records.map(record => NftSold.create(record as NftSoldProps));
      
    }

    static async getByBuyer(buyer: string): Promise<NftSold[] | undefined>{
      
      const records = await store.getByField('NftSold', 'buyer', buyer);
      return records.map(record => NftSold.create(record as NftSoldProps));
      
    }

    static async getByCollectionId(collectionId: number): Promise<NftSold[] | undefined>{
      
      const records = await store.getByField('NftSold', 'collectionId', collectionId);
      return records.map(record => NftSold.create(record as NftSoldProps));
      
    }

    static async getByNftId(nftId: number): Promise<NftSold[] | undefined>{
      
      const records = await store.getByField('NftSold', 'nftId', nftId);
      return records.map(record => NftSold.create(record as NftSoldProps));
      
    }

    static async getByPrice(price: bigint): Promise<NftSold[] | undefined>{
      
      const records = await store.getByField('NftSold', 'price', price);
      return records.map(record => NftSold.create(record as NftSoldProps));
      
    }


    static create(record: NftSoldProps): NftSold {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new NftSold(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
