# HeirTrust V2 SDK

The HeirTrust V2 SDK is a TypeScript library designed to simplify the interaction with the HeirTrust V2 protocol. This SDK provides a high-level interface for developers to easily interact with the protocol's smart contracts and related services.

## Features

- Easy-to-use interface
- Supports custom signer and provider configurations
- Provides utility functions for common tasks

## Documentation
Read more about how to use the HeirTrust V2 SDK [here](https://HeirTrust.github.io/HeirTrust-v2-sdk/index.html).

## Installation

To install the SDK, run the following command in your project directory:

```
npm install @HeirTrust/HeirTrust-sdk
```

## Usage

Here's a basic example of using the HeirTrust V2 SDK in a TypeScript or JavaScript project:

```typescript
import { SarcoClient } from '@HeirTrust/HeirTrust-sdk';

// Initialize the client with a custom provider and signer
const sarco = new SarcoClient({
  signer: yourSignerInstance,
  provider: yourProviderInstance,
});

// Call the helloWorld method
console.log(sarco.helloWorld());
```

## Configuration
The SarcoClient constructor accepts an object with the following properties:

```
signer (optional): An ethers Signer instance.
privateKey (optional): A private key string.
mnemonic (optional): A mnemonic phrase string.
provider (optional): An ethers Provider instance. If not provided, a default provider will be used.
```
At least one of signer, privateKey, or mnemonic must be provided when creating a new SarcoClient instance.

## Methods
### helloWorld
A sample method that returns "Hello World".

```typescript
helloWorld(): string;
```

## Local Development
The SDK may be tested locally by cloning the SDK repository and linking it to your project. 
```
git clone git@github.com:HeirTrust/HeirTrust-v2-sdk.git
cd HeirTrust-v2-sdk
npm run build
npm link 
cd path/to/your/project
npm link HeirTrust-sdk
```

Then it may be imported as if it were added to the package.json.

## Contributing
We welcome contributions to the SDK. If you'd like to contribute, please submit an issue or open a pull request.

## License
This project is licensed under The Unlicense license.

