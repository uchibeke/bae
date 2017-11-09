'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * Sample transaction processor function.
 * @param {org.acme.bae.Take} Take The sample transaction instance.
 * @transaction
 */
function OnTakeAsset(Take) {

    // Get the vehicle asset registry.
    return getAssetRegistry('org.acme.bae.AnAsset')
    .then(function (assetRegistry) {
        return assetRegistry.getAll();
    }).then(function (Assets) {
        // find the asset
        var found = Assets.filter(function (asset) {
            return asset.description === Take.description
                && asset.receiver === Take.receiver
                && asset.owner.includes(Take.owner);
        })
        if (found.length > 0) {
            return assetRegistry.remove(found[0].id);
        } else {
            return Assets;
        }
    }).catch(function (error) {
        // Add optional error handling here.
    });

}

/**
 * Give an asset to a user.
 * @param {org.acme.bae.Give} Give The sample transaction instance.
 * @transaction
 */
function OnGiveAsset(Give) {
    return getAssetRegistry('org.acme.bae.AnAsset')
        .then(function (assetRegistry) {


            // Get the factory.
            var factory = getFactory();
            // Create a new asset.
            var newAsset = factory.newResource('org.acme.bae', 'AnAsset', Give.transactionId);
            // Set the properties of the new asset.
            newAsset.id = Give.transactionId;
            newAsset.owner = factory.newRelationship('org.acme.bae', 'User', Give.owner);
            newAsset.receiver = Give.receiver;
            newAsset.receiverContact = Give.receiverContact;
            newAsset.given = true
            newAsset.description = Give.description;
            newAsset.createdOn = new Date() + "";
            return assetRegistry.add(newAsset);
        })
}


function guid() {
    var num = (this.S4() + this.S4() + "-" + this.S4() + "-4" + this.S4().substr(0, 3) + "-" + this.S4() + "-" + this.S4() + this.S4() + this.S4()).toLowerCase() + "";
    return num;
}