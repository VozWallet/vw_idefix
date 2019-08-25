# Idefix

Idefix is a PBX system for Voice Wallets account generation and user authentication on the Ethereum Network

⚠️ **Be aware that voice channels are insecure channels, this system is intended to be use in emergent economies where users can't afford owning smartphones or internet connection, so the usage is limited to low value ammount of storaging/transacting** ⚠️

### Twitter: https://twitter.com/VozWallet

## Inspiration

Crypto is still not inclusive as it shall be!

Besides the fact that there are still 1.7 billion people with no access to Financial services, there are still 33% of adult people in the world with no access to (mobile) devices where they can have their own cryptowallet.

We believe that people with no phones deserve to have crypto too. They need it and deserve it much more than the average people because they have never experienced what it means own an account, they have never feel economically empowered.

In the believe that the better UX is an invisible UI, we have built a wallet in which the user doesn't need an app or web browser, all that they need is their voice!

## What it does

VozWallet currently has 3 basics features:
- PBX 111: Generating an ethereun wallet user account by calling to the PBX, identifying with a name and generating a password for the Private Key. Demo: https://www.youtube.com/watch?v=5iIFgxnU4ec
- PBX 666: Sending a transaction to another user by identifying self with username and passwords and recipient by its name. Demo: https://www.youtube.com/watch?v=TOsh009zptM
- PBX generate a call: Call recipients phone number after receiving funds. Demo: https://www.youtube.com/watch?v=OHOpr_pRoPU

## How we built it
Everything start with a research! In our case we were looking about the technology state of the art to use voice as a biometric recognition system, we found some interesting papers on neural networks for its application. See https://arxiv.org/pdf/1702.02289.pdf

So we started to deploy the PBX and different dial plans to build a wallet service on top of it. Once the logic was defined, we connected the PBX to the needed tools to manage the features described above. We explore the idea about having key management and voice validation over an Intel SGX as enclave, after many tries we realized we the time was too limit to include it in our scope.

Finally, we decide to add and modify the proyect [Gotoma](https://github.com/adria0/gotoma?files=1) developed last year ETHberlin to give the system an ethereum monitoring capability so we could then notify an user about changes in their account thoroug our Idefix PBX.

## Challenges we ran into
PBX programming and integration with the Ethereum network

## Accomplishments that we're proud of
Integrating PBX with Ethereum and making our first ETH transaction just by using our voice.

## What we learned
* discovered the current status of ASR (Automatic Speech Recognition ) and TTS ( Text to speech ) libraries
* How to create severa dialplans for a PBX
* Intel SGX is a tecnology that can help to solve serval probles pero right now hard to hack into
* The adoption of blockchain tecnologies in enviroments wiht no nternet and smartphones it's very needed 
* Voice recognition system may understand "hymen" when you are willing to make a "payment"

## What's next for VozWallet
* Build our PBX on DappNode
* Enabling Neural Networks for voice recognition
* Add a Social verification system for identity and PK recovery.
* Deploy our solution on top of xDAI, Raiden or any side chain to reduce transaction costs.
* Enabling our solution on a PSTN instead of the current VoIP.
* Enhancing our security features.
* Implement debit/credit payment systems that avoid traditional money as [Trustlines](https://trustlines.network/)
* Go Mainnet, reach that 33% of people in the world with no access to a mobile device use crypto.
