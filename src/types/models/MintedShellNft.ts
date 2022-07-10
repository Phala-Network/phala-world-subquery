// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




type MintedShellNftProps = Omit<MintedShellNft, NonNullable<FunctionPropertyNames<MintedShellNft>>>;

export class MintedShellNft implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public owner: string;

    public shellCollectionId: number;

    public shellNftId: number;

    public originShellCollectionId?: number;

    public originShellNftId?: number;

    public rarity: string;

    public career: string;

    public race: string;

    public generation: number;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save MintedShellNft entity without an ID");
        await store.set('MintedShellNft', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove MintedShellNft entity without an ID");
        await store.remove('MintedShellNft', id.toString());
    }

    static async get(id:string): Promise<MintedShellNft | undefined>{
        assert((id !== null && id !== undefined), "Cannot get MintedShellNft entity without an ID");
        const record = await store.get('MintedShellNft', id.toString());
        if (record){
            return MintedShellNft.create(record as MintedShellNftProps);
        }else{
            return;
        }
    }


    static async getByOwner(owner: string): Promise<MintedShellNft[] | undefined>{
      
      const records = await store.getByField('MintedShellNft', 'owner', owner);
      return records.map(record => MintedShellNft.create(record as MintedShellNftProps));
      
    }

    static async getByShellCollectionId(shellCollectionId: number): Promise<MintedShellNft[] | undefined>{
      
      const records = await store.getByField('MintedShellNft', 'shellCollectionId', shellCollectionId);
      return records.map(record => MintedShellNft.create(record as MintedShellNftProps));
      
    }

    static async getByShellNftId(shellNftId: number): Promise<MintedShellNft[] | undefined>{
      
      const records = await store.getByField('MintedShellNft', 'shellNftId', shellNftId);
      return records.map(record => MintedShellNft.create(record as MintedShellNftProps));
      
    }

    static async getByRarity(rarity: string): Promise<MintedShellNft[] | undefined>{
      
      const records = await store.getByField('MintedShellNft', 'rarity', rarity);
      return records.map(record => MintedShellNft.create(record as MintedShellNftProps));
      
    }

    static async getByCareer(career: string): Promise<MintedShellNft[] | undefined>{
      
      const records = await store.getByField('MintedShellNft', 'career', career);
      return records.map(record => MintedShellNft.create(record as MintedShellNftProps));
      
    }

    static async getByRace(race: string): Promise<MintedShellNft[] | undefined>{
      
      const records = await store.getByField('MintedShellNft', 'race', race);
      return records.map(record => MintedShellNft.create(record as MintedShellNftProps));
      
    }

    static async getByGeneration(generation: number): Promise<MintedShellNft[] | undefined>{
      
      const records = await store.getByField('MintedShellNft', 'generation', generation);
      return records.map(record => MintedShellNft.create(record as MintedShellNftProps));
      
    }


    static create(record: MintedShellNftProps): MintedShellNft {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new MintedShellNft(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
