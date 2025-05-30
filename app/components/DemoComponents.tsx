"use client";

import { useState } from "react";
import { type ReactNode, useCallback, useMemo } from "react";
import { useAccount } from "wagmi";
import {
  Transaction,
  TransactionButton,
  TransactionToast,
  TransactionToastAction,
  TransactionToastIcon,
  TransactionToastLabel,
  TransactionError,
  TransactionResponse,
  TransactionStatusAction,
  TransactionStatusLabel,
  TransactionStatus,
} from "@coinbase/onchainkit/transaction";
import { useNotification, useMiniKit } from "@coinbase/onchainkit/minikit";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  icon?: ReactNode;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  disabled = false,
  type = "button",
  icon,
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0052FF] disabled:opacity-50 disabled:pointer-events-none";

  const variantClasses = {
    primary:
      "bg-[var(--app-accent)] hover:bg-[var(--app-accent-hover)] text-[var(--app-background)]",
    secondary:
      "bg-[var(--app-gray)] hover:bg-[var(--app-gray-dark)] text-[var(--app-foreground)]",
    outline:
      "border border-[var(--app-accent)] hover:bg-[var(--app-accent-light)] text-[var(--app-accent)]",
    ghost:
      "hover:bg-[var(--app-accent-light)] text-[var(--app-foreground-muted)]",
  };

  const sizeClasses = {
    sm: "text-xs px-2.5 py-1.5 rounded-md",
    md: "text-sm px-4 py-2 rounded-lg",
    lg: "text-base px-6 py-3 rounded-lg",
  };

  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className="flex items-center mr-2">{icon}</span>}
      {children}
    </button>
  );
}

type CardProps = {
  title?: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

function Card({
  title,
  children,
  className = "",
  onClick,
}: CardProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (onClick && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className={`bg-[var(--app-card-bg)] backdrop-blur-md rounded-xl shadow-lg border border-[var(--app-card-border)] overflow-hidden transition-all hover:shadow-xl ${className} ${onClick ? "cursor-pointer" : ""}`}
      onClick={onClick}
      onKeyDown={onClick ? handleKeyDown : undefined}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? "button" : undefined}
    >
      {title && (
        <div className="px-5 py-3 border-b border-[var(--app-card-border)]">
          <h3 className="text-lg font-medium text-[var(--app-foreground)]">
            {title}
          </h3>
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
}

type FeaturesProps = {
  setActiveTabAction: (tab: string) => void;
};

export function Features({ setActiveTabAction }: FeaturesProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <Card title="Key Features">
        <ul className="space-y-3 mb-4">
          <li className="flex items-start">
            <Icon name="check" className="text-[var(--app-accent)] mt-1 mr-2" />
            <span className="text-[var(--app-foreground-muted)]">
              Local Verification Mechanism
            </span>
          </li>
          <li className="flex items-start">
            <Icon name="check" className="text-[var(--app-accent)] mt-1 mr-2" />
            <span className="text-[var(--app-foreground-muted)]">
              Tiered Governance Rights
            </span>
          </li>
          <li className="flex items-start">
            <Icon name="check" className="text-[var(--app-accent)] mt-1 mr-2" />
            <span className="text-[var(--app-foreground-muted)]">
              Transparent Treasury Management
            </span>
          </li>
          <li className="flex items-start">
            <Icon name="check" className="text-[var(--app-accent)] mt-1 mr-2" />
            <span className="text-[var(--app-foreground-muted)]">
              Structured process for submitting, discussing, and voting on local initiatives
            </span>
          </li>
          <li className="flex items-start">
            <Icon name="check" className="text-[var(--app-accent)] mt-1 mr-2" />
            <span className="text-[var(--app-foreground-muted)]">
              Mobile-First Interface
            </span>
          </li>

        </ul>
        <Button variant="outline" onClick={() => setActiveTabAction("home")}>
          Back to Home
        </Button>
      </Card>
    </div>
  );
}

type HomeProps = {
  setActiveTabAction: (tab: string) => void;
};

export function Home({ setActiveTabAction }: HomeProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <Card title="Mini DAO">
        <p className="text-[var(--app-foreground-muted)] mb-4">
          Fund Local, Vote Together: Dar`&apos:`s Community Treasury, Powered by Your Voice
        </p>
        <Button
          onClick={() => setActiveTabAction("features")}
          icon={<Icon name="arrow-right" size="sm" />}
        >
          Explore Features
        </Button>
      </Card>


      <TransactionCard />
    </div>
  );
}

type IconProps = {
  name: "heart" | "star" | "check" | "plus" | "arrow-right";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Icon({ name, size = "md", className = "" }: IconProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const icons = {
    heart: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <title>Heart</title>
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    star: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <title>Star</title>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    check: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <title>Check</title>
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    plus: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <title>Plus</title>
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    ),
    "arrow-right": (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <title>Arrow Right</title>
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    ),
  };

  return (
    <span className={`inline-block ${sizeClasses[size]} ${className}`}>
      {icons[name]}
    </span>
  );
}


function TransactionCard() {
  const { address } = useAccount();

  // Example transaction call - sending 0 ETH to self
  const calls = useMemo(() => address
    ? [
        {
          to: address,
          data: "0x" as `0x${string}`,
          value: BigInt(0),
        },
      ]
    : [], [address]);

  const sendNotification = useNotification();

  const handleSuccess = useCallback(async (response: TransactionResponse) => {
    const transactionHash = response.transactionReceipts[0].transactionHash;

    console.log(`Transaction successful: ${transactionHash}`);

    await sendNotification({
      title: "Congratulations!",
      body: `You sent your a transaction, ${transactionHash}!`,
    });
  }, [sendNotification]);

  return (
    <Card title="Make Your First Transaction">
      <div className="space-y-4">
        <p className="text-[var(--app-foreground-muted)] mb-4">
          Experience the power of seamless sponsored transactions with{" "}
          <a
            href="https://onchainkit.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0052FF] hover:underline"
          >
            OnchainKit
          </a>
          .
        </p>

        <div className="flex flex-col items-center">
          {address ? (
            <Transaction
              calls={calls}
              onSuccess={handleSuccess}
              onError={(error: TransactionError) =>
                console.error("Transaction failed:", error)
              }
            >
              <TransactionButton className="text-white text-md" />
              <TransactionStatus>
                <TransactionStatusAction />
                <TransactionStatusLabel />
              </TransactionStatus>
              <TransactionToast className="mb-4">
                <TransactionToastIcon />
                <TransactionToastLabel />
                <TransactionToastAction />
              </TransactionToast>
            </Transaction>
          ) : (
            <p className="text-yellow-400 text-sm text-center mt-2">
              Connect your wallet to send a transaction
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}



export function Profile() {
  const { context } = useMiniKit();
  const fid = context?.user?.fid;
  const displayName = context?.user?.displayName;
  return (
    <div className="space-y-6 animate-fade-in">
      <Card title="My Profile">
      {fid && displayName ? (
        <div>
          <p><strong>FID:</strong> {fid}</p>
          <p><strong>Display Name:</strong> {displayName}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
      </Card>
    </div>
  );
}




type TabItemProps = {
  label: string,
  icon: React.ReactNode,
  isActive: boolean,
  onClick: () => void,
}

const TabItem = ( { label, icon, isActive, onClick }: TabItemProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center flex-1 py-2 ${
        isActive ? "text-purple-600" : "text-gray-400"
      }`}
    >
      <div className="mb-1">{icon}</div>
      <span className={`text-xs font-medium ${isActive ? "font-semibold" : ""}`}>
        {label}
      </span>
    </button>
  );
};

type StickyFooterProps = {
  activeTab: string;
  setActiveTabAction: (tabId: string) => void;

}

export function StickyFooter({activeTab, setActiveTabAction}: StickyFooterProps) {

  const tabs = [
                  { 
                    id: "home",
                    label: "Home",
                    icon: (
                  <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  >
                  <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
                  </svg>
                  ),

                  isActive: true,
                  
                }
    ,
                { 
                  id: "features",
                  label: "Features",
                  icon: (
                <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path d="M3 9h4V5H3v4zm0 5h4v-4H3v4zm5 0h4v-4H8v4zm5 0h4v-4h-4v4zM8 9h4V5H8v4zm5-4v4h4V5h-4z" />
                </svg>
                ),
                isActive: false,
                },
                { 
                  id: "myProfile",
                  label: "My Profile",
                  icon: (
                <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-" /> 
                </svg>
                ),
                isActive: false,
                },
                { 
                  id: "proposals",
                  label: "Proposals",
                  icon: (
                <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path d="M16 2H8C4.691 2 2 4.691 2 8v12c0 3.309 2.691 6 6 6h8c3.309 0 6-2.691 6-6V8c0-3.309-2.691-6-6-6zm0 2c2.273 0 4 1.727 4 4v12c0 2.273-1.727 4-4 4H8c-2.273 0-4-1.727-4-4V8c0-2.273 1.727-4 4-4h8zM12 6c1.105 0 2 .895 2 2s-.895 2-2 2-2-.895-2-2 .895-2 2-2zm0 4c-.552 0-1-.448-1-1s.448-1 1-1 1 .448 1 1-.448 1-1 1zm4 2H8v2h8v-2z"/> 
                </svg>
                ),
                isActive: false,
                },
                ]
{
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-[var(--app-background)] border-t border-[var(--app-card-border)] p-4">
      <div className="flex justify-center">
        {tabs.map((tab, index) => (
            <TabItem
            key={tab.id || index}
            label={tab.label}
            icon={tab.icon}
            isActive={activeTab === tab.id}
            onClick={() => setActiveTabAction(tab.id)}
          />

        ))}
      </div>
    </footer>
  );
}
}


const dummyProposals = [
  {
    id: 1,
    title: "Fund Local Playground Renovation",
    creator: "0xA1b2...eF34",
    description:
      "Proposal to allocate 2 ETH from the treasury to renovate the neighborhood playground, including new equipment and safety upgrades.",
    status: "active",
    yesVotes: 42,
    noVotes: 10,
    endTime: Date.now() + 1000 * 60 * 60 * 24, // 24 hours from now
  },
  {
    id: 2,
    title: "Sponsor Community Art Festival",
    creator: "0xB3c4...dE56",
    description:
      "Proposal to sponsor the annual community art festival with a grant of 1 ETH for local artists and event logistics.",
    status: "past",
    yesVotes: 38,
    noVotes: 3,
    endTime: Date.now() - 1000 * 60 * 60 * 5, // 5 hours ago
  },
  {
    id: 3,
    title: "Upgrade DAO Website",
    creator: "0xC5d6...fA78",
    description:
      "Proposal to allocate 0.5 ETH for a redesign and feature upgrade of the DAO website, improving accessibility and mobile UX.",
    status: "active",
    yesVotes: 14,
    noVotes: 2,
    endTime: Date.now() + 1000 * 60 * 60 * 5, // 5 hours from now
  },
];


// Helper to format time remaining
function formatTimeRemaining(endTime: number) {
  const diff = endTime - Date.now();
  if (diff <= 0) return "Voting ended";
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}h ${mins}m left`;
}

export function Proposals() {
  // State for expanded proposal details
  const [openProposalId, setOpenProposalId] = useState<number | null>(null);
  // State for vote status per proposal (id: "yes" | "no" | null)
  const [votes, setVotes] = useState<Record<number, "yes" | "no" | null>>({});
  // State for showing vote confirmation
  const [showConfirm, setShowConfirm] = useState<Record<number, boolean>>({});

  // Separate active and past proposals
  const activeProposals = dummyProposals.filter((p) => p.status === "active");
  const pastProposals = dummyProposals.filter((p) => p.status === "past");

  // Handle voting (dummy logic)
  const handleVote = (proposalId: number, vote: "yes" | "no") => {
    setVotes((prev) => ({ ...prev, [proposalId]: vote }));
    setShowConfirm((prev) => ({ ...prev, [proposalId]: true }));
    // Hide confirmation after 1.5s
    setTimeout(() => {
      setShowConfirm((prev) => ({ ...prev, [proposalId]: false }));
    }, 1500);
  };



function ProposalCard({ proposal }: { proposal: typeof dummyProposals[0] }) {
    return (
      <Card
        className="mb-4 cursor-pointer"
        onClick={() => setOpenProposalId(proposal.id === openProposalId ? null : proposal.id)}
        title={proposal.title}
      >
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <div>
            <div className="text-xs text-[var(--app-foreground-muted)] mb-1">
              Creator: <span className="font-mono">{proposal.creator}</span>
            </div>
            <div className="text-xs">
              Status: {proposal.status === "active" ? (
                <span className="text-green-600 font-medium">Active</span>
              ) : (
                <span className="text-gray-400">Past</span>
              )}
            </div>
          </div>
          <div className="text-xs text-right">
            {proposal.status === "active"
              ? formatTimeRemaining(proposal.endTime)
              : "Voting ended"}
          </div>
        </div>
        {openProposalId === proposal.id && (
          <ProposalDetails proposal={proposal} />
        )}
      </Card>
    );
}

function ProposalDetails({ proposal }: { proposal: typeof dummyProposals[0] }) {
  const voted = votes[proposal.id];
  const confirmed = showConfirm[proposal.id];
  const totalVotes = proposal.yesVotes + proposal.noVotes;
  const yesPercent = totalVotes ? Math.round((proposal.yesVotes / totalVotes) * 100) : 0;
  const noPercent = totalVotes ? Math.round((proposal.noVotes / totalVotes) * 100) : 0;
  return (
    <div className="mt-4 border-t pt-4">
      <div className="mb-2 text-[var(--app-foreground)]"><b>Description:</b></div>
      <div className="mb-4 text-[var(--app-foreground-muted)] text-sm">{proposal.description}</div>
      <div className="mb-4">
        <div className="flex justify-between text-xs">
          <span>Yes: <b>{proposal.yesVotes}</b> ({yesPercent}%)</span>
          <span>No: <b>{proposal.noVotes}</b> ({noPercent}%)</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2 mb-2 flex">
          <div
            className="bg-green-400 h-2 rounded-l-full"
            style={{ width: `${yesPercent}%` }}
          />
          <div
            className="bg-red-400 h-2 rounded-r-full"
            style={{ width: `${noPercent}%` }}
          />
        </div>
      </div>
      {proposal.status === "active" && !voted && (
        <div className="flex gap-3">
          <Button
            variant="primary"
            size="md"
            onClick={() => {
              handleVote(proposal.id, "yes");
            }}
          >
            Yes
          </Button>
          <Button
            variant="outline"
            size="md"
            onClick={() => {
              handleVote(proposal.id, "no");
            }}
          >
            No
          </Button>
        </div>
      )}
      {proposal.status === "active" && voted && (
        <div className="mt-2">
          {confirmed ? (
            <span className="text-green-600 font-medium">Vote submitted!</span>
          ) : (
            <span className="text-[var(--app-foreground-muted)]">You voted <b>{voted.toUpperCase()}</b></span>
          )}
        </div>
      )}
      {proposal.status === "past" && (
        <div className="mt-2 text-gray-400">Voting ended</div>
      )}
      <div className="mt-4 text-xs text-right text-gray-400">
        {proposal.status === "active"
          ? formatTimeRemaining(proposal.endTime)
          : "Voting ended"}
      </div>
    </div>
  );
}

return (
  <div className="space-y-6 animate-fade-in">
    {/* Active Proposals */}
    <div>
      <div className="text-lg font-semibold mb-3">Active Proposals</div>
      {activeProposals.length === 0 && (
        <div className="text-[var(--app-foreground-muted)] mb-4">No active proposals.</div>
      )}
      {activeProposals.map((proposal) => (
        <ProposalCard key={proposal.id} proposal={proposal} />
      ))}
    </div>
    {/* Past Proposals */}
    <div>
      <div className="text-lg font-semibold mb-3 mt-6">Past Proposals</div>
      {pastProposals.length === 0 && (
        <div className="text-[var(--app-foreground-muted)] mb-4">No past proposals.</div>
      )}
      {pastProposals.map((proposal) => (
        <ProposalCard key={proposal.id} proposal={proposal} />
      ))}
    </div>
  </div>
);
}
