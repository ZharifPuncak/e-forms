<?php

namespace App\Mail\Notification;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
 
class Annoucement extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    protected $issuance;
    public function __construct($issuance)
    {
        $this->issuance = $issuance;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            from: new Address(env('VITE_EMAIL_SENDER'), 'noreply'),
            subject: 'Announcement : '. $issuance->form->name.' acknowledgement.',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'mails.issuance.announcement',
            with: [
                'form_name'      => $issuance->form->name,
                'form_alias'      => $issuance->form->alias,
                'form_code'      => $issuance->form->code,
                'effective_from' => $issuance->form->effective_from,
                'effective_to'   => $issuance->form->effective_to,
                'deadline'       => $issuance->deadlined_at
            ],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
