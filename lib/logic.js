'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * Sample transaction processor function.
 * @param {org.acme.bae.Take} tx The sample transaction instance.
 * @transaction
 */
function OnTakeAsset(tx) {
    // Update the value in the asset.
    var asset = tx.AssetToTake;
    asset.receiver = tx.owner;
    // Get the asset registry that stores the assets. Note that
    // getAssetRegistry() returns a promise, so we have to return
    // the promise so that Composer waits for it to be resolved.
    return getAssetRegistry('org.acme.bae.AnAsset')
        .then(function (assetRegistry) {
            // Update the asset in the asset registry. Again, note
            // that update() returns a promise, so so we have to return
            // the promise so that Composer waits for it to be resolved.
            return assetRegistry.update(asset);
        })
}

/**
 * Sample transaction processor function.
 * @param {org.acme.bae.Give} tx The sample transaction instance.
 * @transaction
 */
function OnGiveAsset(tx) {

    // Get the factory.
    var factory = getFactory();
    // Create a new asset.
    var newAsset = factory.newResource('org.acme.bae', 'AnAsset', tx.assetInfo.description);
    // Set the properties of the new asset.
    newAsset.owner = tx.assetInfo.owner;
    newAsset.receiver = tx.assetInfo.receiver;
    newAsset.receiver = tx.assetInfo.receiver;
    newAsset.description = tx.assetInfo.description;
    newAsset.createdOn = new Date();

    return getAssetRegistry('org.acme.bae.AnAsset')
    .then(function (assetRegistry) {
        return assetRegistry.add(newAsset);
    })
}