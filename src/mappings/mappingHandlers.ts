import {SubstrateEvent} from "@subql/types";
import {MintedOriginOfShellNft, StartedIncubationTime, MintedShellNft} from "../types";


export async function handleMintedOriginOfShell(event: SubstrateEvent): Promise<void> {
    const {event: {data: [rarityType, collectionId, nftId, owner, race, career, generationId]}} = event;
    //Retrieve the record by its ID
    const record = await MintedOriginOfShellNft.get(event.block.block.header.hash.toString());
    await record.save();
}

export async function handleStartedIncubation(event: SubstrateEvent): Promise<void> {
    const {event: {data: [collectionId, nftId, owner, startTime, hatchTime]}} = event;
    //Retrieve the record by its ID
    const record = await StartedIncubationTime.get(event.block.block.header.hash.toString());
    await record.save();
}

export async function handleMintedShell(event: SubstrateEvent): Promise<void> {
    const {event: {data: [shellCollectionId, shellNftId, rarity, career, race, generationId, originOfShellCollectionId, originOfShellNftId, owner]}} = event;
    //Retrieve the record by its ID
    const record = await MintedShellNft.get(event.block.block.header.hash.toString());
    await record.save();
}


