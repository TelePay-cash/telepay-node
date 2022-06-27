export enum WebhookEvents {
    AllEvents = 'all',
    InvoiceCompleted = 'invoice.completed',
    InvoiceCancelled = 'invoice.cancelled',
    InvoiceExpired = 'invoice.expired',
    InvoiceDeleted = 'invoice.deleted',
    /**
     *   [Coming Soon]
     *   WithdrawalCreated = 'withdrawal.created',
     *   WithdrawalApproved = 'withdrawal.approved',
     *   WithdrawalAuditing = 'withdrawal.auditing',
     *   WithdrawalPerforming = 'withdrawal.performing',
     *   WithdrawalConfirming = 'withdrawal.confirming',
     *   WithdrawalFailed = 'withdrawal.failed',
     *   WithdrawalCompleted = 'withdrawal.completed',
     */
}
