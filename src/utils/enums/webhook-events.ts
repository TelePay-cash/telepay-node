export enum WebhookEvents {
    AllEvents = 'all',
    InvoiceCreated = 'invoice.created',
    InvoiceCompleted = 'invoice.completed',
    InvoiceExpired = 'invoice.expired',
    InvoiceCancelled = 'invoice.cancelled',
    InvoiceDeleted = 'invoice.deleted',
    WithdrawalPending = 'withdrawal.pending',
    WithdrawalAuditing = 'withdrawal.auditing',
    WithdrawalApproved = 'withdrawal.approved',
    WithdrawalPerforming = 'withdrawal.performing',
    WithdrawalConfirming = 'withdrawal.confirming',
    WithdrawalCompleted = 'withdrawal.completed',
    WithdrawalFailed = 'withdrawal.failed'
}
