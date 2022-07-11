// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type MintedOriginOfShellNftProps = Omit<MintedOriginOfShellNft, NonNullable<FunctionPropertyNames<MintedOriginOfShellNft>>>;

export class MintedOriginOfShellNft implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public createdAt: Date;

    public owner: string;

    public collectionId: number;

    public nftId: number;

    public rarity: string;

    public career: string;

    public race: string;

    public generation: number;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save MintedOriginOfShellNft entity without an ID");
        await store.set('MintedOriginOfShellNft', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove MintedOriginOfShellNft entity without an ID");
        await store.remove('MintedOriginOfShellNft', id.toString());
    }

    static async get(id:string): Promise<MintedOriginOfShellNft | undefined>{
        assert((id !== null && id !== undefined), "Cannot get MintedOriginOfShellNft entity without an ID");
        const record = await store.get('MintedOriginOfShellNft', id.toString());
        if (record){
            return MintedOriginOfShellNft.create(record as MintedOriginOfShellNftProps);
        }else{
            return;
        }
    }


    static async getByOwner(owner: string): Promise<MintedOriginOfShellNft[] | undefined>{
      
      const records = await store.getByField('MintedOriginOfShellNft', 'owner', owner);
      return records.map(record => MintedOriginOfShellNft.create(record as MintedOriginOfShellNftProps));
      
    }

    static async getByCollectionId(collectionId: number): Promise<MintedOriginOfShellNft[] | undefined>{
      
      const records = await store.getByField('MintedOriginOfShellNft', 'collectionId', collectionId);
      return records.map(record => MintedOriginOfShellNft.create(record as MintedOriginOfShellNftProps));
      
    }

    static async getByNftId(nftId: number): Promise<MintedOriginOfShellNft[] | undefined>{
      
      const records = await store.getByField('MintedOriginOfShellNft', 'nftId', nftId);
      return records.map(record => MintedOriginOfShellNft.create(record as MintedOriginOfShellNftProps));
      
    }

    static async getByRarity(rarity: string): Promise<MintedOriginOfShellNft[] | undefined>{
      
      const records = await store.getByField('MintedOriginOfShellNft', 'rarity', rarity);
      return records.map(record => MintedOriginOfShellNft.create(record as MintedOriginOfShellNftProps));
      
    }

    static async getByCareer(career: string): Promise<MintedOriginOfShellNft[] | undefined>{
      
      const records = await store.getByField('MintedOriginOfShellNft', 'career', career);
      return records.map(record => MintedOriginOfShellNft.create(record as MintedOriginOfShellNftProps));
      
    }

    static async getByRace(race: string): Promise<MintedOriginOfShellNft[] | undefined>{
      
      const records = await store.getByField('MintedOriginOfShellNft', 'race', race);
      return records.map(record => MintedOriginOfShellNft.create(record as MintedOriginOfShellNftProps));
      
    }

    static async getByGeneration(generation: number): Promise<MintedOriginOfShellNft[] | undefined>{
      
      const records = await store.getByField('MintedOriginOfShellNft', 'generation', generation);
      return records.map(record => MintedOriginOfShellNft.create(record as MintedOriginOfShellNftProps));
      
    }


    static create(record: MintedOriginOfShellNftProps): MintedOriginOfShellNft {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new MintedOriginOfShellNft(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
