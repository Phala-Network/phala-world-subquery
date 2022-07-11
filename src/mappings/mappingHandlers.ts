import {SubstrateEvent} from "@subql/types";
import {MintedOriginOfShellNft, StartedIncubationTime, MintedShellNft, NftListed, NftSold, NftUnlisted} from "../types";


export async function handleMintedOriginOfShell(event: SubstrateEvent): Promise<void> {
    const {event: {data: [rarityType, collectionId, nftId, owner, race, career, generationId]}} = event;
    //Retrieve the record by its ID
    let id = `${collectionId}-${nftId}`
    let record = await MintedOriginOfShellNft.get(id)
    if (record === undefined) {
        record = new MintedOriginOfShellNft(id)
        record.createdAt = event.block.timestamp
        record.owner = owner.toString()
        record.collectionId = collectionId as unknown as number
        record.nftId = nftId as unknown as number
        record.rarity = rarityType.toHuman().toString()
        record.career = career.toHuman().toString()
        record.race = race.toHuman().toString()
        record.generation = generationId as unknown as number
    }
    await record.save();
    logger.debug(`Add new MintedOriginOfShellNft record: ${record}`)
}

export async function handleStartedIncubation(event: SubstrateEvent): Promise<void> {
    const {event: {data: [collectionId, nftId, owner, startTime, hatchTime]}} = event;
    //Retrieve the record by its ID
    let id = `${collectionId}-${nftId}`
    let record = await StartedIncubationTime.get(id)
    if (record === undefined) {
        record = new StartedIncubationTime(id)
        record.owner = owner.toString()
        record.collectionId = collectionId as unknown as number
        record.nftId = nftId as unknown as number
        record.startTime = BigInt(startTime.toString())
        record.hatchTime = BigInt(hatchTime.toString())
    }
    await record.save();
    logger.debug(`Add new StartedIncubationTime record: ${record}`)
}

export async function handleMintedShell(event: SubstrateEvent): Promise<void> {
    const {event: {data: [shellCollectionId, shellNftId, rarity, career, race, generationId, originOfShellCollectionId, originOfShellNftId, owner]}} = event;
    //Retrieve the record by its ID
    let id = `${shellCollectionId}-${shellNftId}`
    let record = await MintedShellNft.get(id)
    if (record === undefined) {
        record = new MintedShellNft(id)
        record.createdAt = event.block.timestamp
        record.owner = owner.toString()
        record.shellCollectionId = shellCollectionId as unknown as number
        record.shellNftId = shellNftId as unknown as number
        record.rarity = rarity.toHuman().toString()
        record.career = career.toHuman().toString()
        record.race = race.toHuman().toString()
        record.generation = generationId as unknown as number
        record.originShellCollectionId = originOfShellCollectionId as unknown as number
        record.originShellNftId = originOfShellNftId as unknown as number
    }
    await record.save();
    logger.debug(`Add new MintedShellNft record: ${record}`)
}

export async function handleNftListed(event: SubstrateEvent): Promise<void> {
    const {event: {data: [owner, collectionId, nftId, amount]}} = event;
    //Retrieve the record by its ID
    let id = `${collectionId}-${nftId}`
    let record = await NftListed.get(id)
    if (record === undefined) {
        record = new NftListed(id)
        record.createdAt = event.block.timestamp
        record.owner = owner.toString()
        record.collectionId = collectionId as unknown as number
        record.nftId = nftId as unknown as number
        record.amount = BigInt(amount.toString())
    }
    await record.save();
    logger.debug(`Add new NftListed record: ${record}`)
}

export async function handleNftUnlisted(event: SubstrateEvent): Promise<void> {
    const {event: {data: [owner, collectionId, nftId]}} = event;
    //Retrieve the record by its ID
    let id = `${collectionId}-${nftId}`
    let record = await NftUnlisted.get(id)
    if (record === undefined) {
        record = new NftUnlisted(id)
        record.createdAt = event.block.timestamp
        record.owner = owner.toString()
        record.collectionId = collectionId as unknown as number
        record.nftId = nftId as unknown as number
    }
    await record.save();
    logger.debug(`Add new NftUnlisted record: ${record}`)
}

export async function handleNftSold(event: SubstrateEvent): Promise<void> {
    const {event: {data: [sender, buyer, collectionId, nftId, price]}} = event;
    //Retrieve the record by its ID
    let id = `${collectionId}-${nftId}`
    let record = await NftSold.get(id)
    if (record === undefined) {
        record = new NftSold(id)
        record.createdAt = event.block.timestamp
        record.sender = sender.toString()
        record.buyer = buyer.toString()
        record.collectionId = collectionId as unknown as number
        record.nftId = nftId as unknown as number
        record.price = BigInt(price.toString())
    }
    await record.save();
    logger.debug(`Add new NftSold record: ${record}`)
}
