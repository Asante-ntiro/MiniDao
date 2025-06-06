# MiniDAO - Decentralized Governance Platform

## Overview

MiniDAO is a decentralized autonomous organization (DAO) platform built with MiniKit, enabling decentralized governance through proposal creation and voting. The application provides a seamless interface for community members to participate in decision-making processes through on-chain voting mechanisms.

## Features

### Proposal System
- **Create Proposals**: Community members can submit proposals for consideration
- **Vote on Proposals**: Cast yes/no votes on active proposals
- **Proposal Tracking**: Monitor voting progress in real-time
- **Time-based Voting**: Proposals have specific voting windows with countdown timers

### User Interface
- **Responsive Design**: Optimized for both mobile and desktop experiences
- **Tabbed Navigation**: Easy access to Home, Features, Proposals, and Profile sections
- **Dark/Light Mode**: Theme support through OnchainKit

### Web3 Integration
- **Wallet Connection**: Seamless integration with Web3 wallets using Wagmi
- **Transaction Handling**: Streamlined transaction flow with status updates
- **Blockchain Interaction**: On-chain voting and proposal management
- **Farcaster Integration**: Frame metadata and account association

## Technical Stack

- **Frontend Framework**: [Next.js](https://nextjs.org) with TypeScript
- **UI Framework**: [Tailwind CSS](https://tailwindcss.com)
- **Web3 Libraries**:
  - [MiniKit](https://docs.base.org/builderkits/minikit/overview) - Frame-optimized UI components
  - [OnchainKit](https://www.base.org/builders/onchainkit) - Transaction handling and notifications
  - [Wagmi](https://wagmi.sh) - React hooks for Ethereum
- **Notification System**: Redis-backed notification system using Upstash

## How MiniDAO Helps Local Communities Coordinate
MiniDAO offers powerful tools that can transform how local communities make decisions and coordinate activities:

### Decentralized Decision-Making
- Inclusive Governance: MiniDAO enables every community member to participate in decision-making, regardless of their technical background. The simple interface makes voting accessible to everyone.
- Transparent Proposal System: All proposals and voting results are recorded on the blockchain, creating an immutable and transparent record of community decisions.
- Time-Bound Voting: The timed voting windows ensure decisions move forward on a reasonable schedule, preventing stalled initiatives.

### Community Resource Allocation
- Fund Local Projects: Communities can create proposals for allocating resources to local initiatives like playground renovations, community gardens, or educational programs.
Accountable Spending: All fund allocation decisions are transparent and require community approval, ensuring resources are used as intended.
- Micro-Grants: Communities can establish small grant programs where members propose projects and the community votes on which to fund.
### Practical Applications
- Neighborhood Associations: Replace traditional meetings with a digital platform where residents can propose and vote on improvements.
- Community Cooperatives: Manage shared resources like community-owned businesses, land trusts, or solar installations.
- Local Event Planning: Decide on event themes, locations, and resource allocation through community consensus.
- Emergency Response Coordination: During emergencies, quickly poll community members on immediate needs and resource distribution.


## Usage

### Creating a Proposal
1. Connect your Web3 wallet
2. Navigate to the Proposals tab
3. Click "Create Proposal"
4. Fill in proposal details and submit

### Voting on Proposals
1. Browse active proposals in the Proposals tab
2. Click on a proposal to view details
3. Cast your vote (Yes/No)
4. Confirm transaction in your wallet


## Learn More

- [MiniKit Documentation](https://docs.base.org/builderkits/minikit/overview)
- [OnchainKit Documentation](https://docs.base.org/builderkits/onchainkit/getting-started)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Base Chain Documentation](https://docs.base.org/)

## License

MIT
