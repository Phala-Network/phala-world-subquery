import type {SubstrateEvent, SubstrateExtrinsic} from "@subql/types";
import {
    MintedOriginOfShellNft,
    StartedIncubationTime,
    FedOriginOfShell,
    MintedShellNft,
    ListedNft,
    SoldNft,
    UnlistedNft,
    OriginOfShellPreorder,
    PreorderStatus,
    Identity,
    EarnedEnergyPoint,
} from "../types";
import { v4 as uuidv4 } from 'uuid'

export async function handleMintedOriginOfShell(event: SubstrateEvent): Promise<void> {
    const {event: {data: [rarityType, collectionId, nftId, owner, race, career, generationId]}} = event;
    //Retrieve the record by its ID
    let id = `${collectionId}-${nftId}`
    let record = await MintedOriginOfShellNft.get(id)
    if (record === undefined) {
        let identity = await Identity.get(owner.toString())
        if (!identity) {
            identity = new Identity(owner.toString())
            await identity.save()
        }
        record = new MintedOriginOfShellNft(id)
        record.createdAt = event.block.timestamp
        record.owner = owner.toString()
        record.identityId = owner.toString()
        record.collectionId = collectionId as unknown as number
        record.nftId = nftId as unknown as number
        record.rarity = rarityType.toHuman().toString()
        record.career = career.toHuman().toString()
        record.race = race.toHuman().toString()
        record.generation = generationId as unknown as number
        await record.save();
    }
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

export async function handleFedOriginOfShell(event: SubstrateEvent): Promise<void> {
    const {event: {data: [collectionId, nftId, sender, era]}} = event;
    let nft = await MintedOriginOfShellNft.get(`${collectionId}-${nftId}`)
    if (nft !== undefined) {
        let record = new FedOriginOfShell(uuidv4())
        record.receiver = nft.owner
        record.shellId = `${collectionId}-${nftId}`
        record.createdAt = event.block.timestamp
        record.sender = sender.toString()
        record.collectionId = collectionId as unknown as number
        record.nftId = nftId as unknown as number
        record.era = era as unknown as number
        record.senderIdentityId = sender.toString()
        record.receiverIdentityId = nft.owner.toString()
        await record.save();
        logger.debug(`Add new FedOriginOfShell record: ${record}`)

        if (nft.owner.toString() === sender.toString()) {
            let receiver = await Identity.get(nft.owner.toString())
            if (!receiver) {
                receiver = new Identity(nft.owner.toString())
                await receiver.save()
            }
            const ball = new EarnedEnergyPoint(uuidv4())
            ball.identityId = receiver.id
            ball.fedId = record.id
            ball.points = 3
            ball.era = era as unknown as number
            ball.createdAt = event.block.timestamp
            await ball.save()
        } else {
            let receiver = await Identity.get(nft.owner.toString())
            if (!receiver) {
                receiver = new Identity(nft.owner.toString())
                await receiver.save()
            }
            const ball1 = new EarnedEnergyPoint(uuidv4())
            ball1.identityId = receiver.id
            ball1.fedId = record.id
            ball1.points = 2
            ball1.era = era as unknown as number
            ball1.createdAt = event.block.timestamp
            await ball1.save()

            let senderRec = await Identity.get(sender.toString())
            if (!senderRec) {
                senderRec = new Identity(sender.toString())
                await senderRec.save()
            }
            const ball2 = new EarnedEnergyPoint(uuidv4())
            ball2.identityId = senderRec.id
            ball2.fedId = record.id
            ball2.points = 1
            ball2.era = era as unknown as number
            ball2.createdAt = event.block.timestamp
            await ball2.save()
        }
    }
}

export async function handleMintedShell(event: SubstrateEvent): Promise<void> {
    const {event: {data: [shellCollectionId, shellNftId, rarity, career, race, generationId, originOfShellCollectionId, originOfShellNftId, owner]}} = event;
    //Retrieve the record by its ID
    let id = `${shellCollectionId}-${shellNftId}`
    let record = await MintedShellNft.get(id)
    let origin_id = `${originOfShellCollectionId}-${originOfShellNftId}}`
    const origin = await MintedOriginOfShellNft.get(origin_id)
    if (record === undefined) {
        record = new MintedShellNft(id)
        record.createdAt = event.block.timestamp
        record.owner = owner.toString()
        record.identityId = owner.toString()
        record.shellCollectionId = shellCollectionId as unknown as number
        record.shellNftId = shellNftId as unknown as number
        record.rarity = rarity.toHuman().toString()
        record.career = career.toHuman().toString()
        record.race = race.toHuman().toString()
        record.generation = generationId as unknown as number
        record.originShellCollectionId = originOfShellCollectionId as unknown as number
        record.originShellNftId = originOfShellNftId as unknown as number
        await record.save();
        if (origin) {
            //origin.shellId = id
            //await origin.save()
        }
    }
    logger.debug(`Add new MintedShellNft record: ${record}`)
}

export async function handleOriginOfShellPreorder(event: SubstrateEvent): Promise<void> {
    const {event: {data: [owner, preorderId, race, career]}} = event;
    //Retrieve the record by its ID
    let id = `${preorderId}-${owner}`
    let record = await OriginOfShellPreorder.get(id)
    if (record === undefined) {
        record = new OriginOfShellPreorder(id)
        record.createdAt = event.block.timestamp
        record.owner = owner.toString()
        record.race = race.toString()
        record.career = career.toString()
        record.preorderId = preorderId as unknown as number
        record.status = PreorderStatus.PENDING
    }
    await record.save();
    logger.debug(`Add new OriginOfShellPreorder record: ${record}`)
}

export async function handleChosenPreorderMinted(event: SubstrateEvent): Promise<void> {
    const {event: {data: [preorderId, owner, nftId]}} = event;
    let id = `${preorderId}-${owner}`
    let record = await OriginOfShellPreorder.get(id)
    if (record !== undefined) {
        record.status = PreorderStatus.CHOSEN
        record.nftId = nftId as unknown as number
        await record.save();
        logger.debug(`Update OriginOfShellPreorder record: ${record}`)
    }
}

export async function handleNotChosenPreorderRefunded(event: SubstrateEvent): Promise<void> {
    const {event: {data: [preorderId, owner]}} = event;
    let id = `${preorderId}-${owner}`
    let record = await OriginOfShellPreorder.get(id)
    if (record !== undefined) {
        record.status = PreorderStatus.REFUNDED
        await record.save();
        logger.debug(`Update OriginOfShellPreorder record: ${record}`)
    }
}

export async function handleListedNft(event: SubstrateEvent): Promise<void> {
    const {event: {data: [owner, collectionId, nftId, amount]}} = event;
    //Retrieve the record by its ID
    let id = `${collectionId}-${nftId}`
    let record = await ListedNft.get(id)
    if (record === undefined) {
        record = new ListedNft(id)
        record.createdAt = event.block.timestamp
        record.owner = owner.toString()
        record.collectionId = collectionId as unknown as number
        record.nftId = nftId as unknown as number
        record.amount = BigInt(amount.toString())
    }
    await record.save();
    logger.debug(`Add new NftListed record: ${record}`)
}

export async function handleUnlistedNft(event: SubstrateEvent): Promise<void> {
    const {event: {data: [owner, collectionId, nftId]}} = event;
    //Retrieve the record by its ID
    let id = `${collectionId}-${nftId}`
    let record = await UnlistedNft.get(id)
    if (record === undefined) {
        record = new UnlistedNft(id)
        record.createdAt = event.block.timestamp
        record.owner = owner.toString()
        record.collectionId = collectionId as unknown as number
        record.nftId = nftId as unknown as number
    }
    await record.save();
    logger.debug(`Add new NftUnlisted record: ${record}`)
}

export async function handleSoldNft(event: SubstrateEvent): Promise<void> {
    const {event: {data: [sender, buyer, collectionId, nftId, price]}} = event;
    //Retrieve the record by its ID
    let id = `${collectionId}-${nftId}`
    let record = await SoldNft.get(id)
    if (record === undefined) {
        record = new SoldNft(id)
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

export async function handleIdentitySet(extrinsic: SubstrateExtrinsic): Promise<void> {
    const signer = extrinsic.extrinsic.signer.toString();
    const args = JSON.parse(extrinsic.extrinsic.args.toString());
    let record = await Identity.get(signer)
    if (record === undefined) {
        record = new Identity(signer)
    }
    const displayName = args?.display?.raw || ''
    if (displayName) {
        record.displayName = decodeURIComponent(displayName.slice(2).replace(/[0-9a-f]{2}/g, '%$&'))
        await record.save()
    }
}
