# Bae: org.acme.bae

Bea is a blockchain ecosystem that allows users give people access to a named asset.

## Features

- Give somone access to an asset
- Take back given access from 
- Ask if someone has access to an asset

## Installation

TODO

## Usage

`composer archive create -a dist/bae.bna --sourceType dir --sourceName .`

`composer network deploy -a dist/bae.bna -p hlfv1 -i PeerAdmin -s randomString -A admin -S`

`composer network update -a dist/bae.bna  -p hlfv1 -i admin -s adminpw`

`composer-rest-server -p hlfv1 -n bae -i admin -s adminpw -P 8080`

TODO 


## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## History

TODO

## Credits

TODO

## License

TODO: Write license
