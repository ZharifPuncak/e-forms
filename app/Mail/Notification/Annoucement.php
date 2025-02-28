<?php

namespace App\Mail\Notification;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\URL;
 
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
            subject: 'Announcement : '.$this->issuance->form->name.' acknowledgement.',
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
                'form_name'      =>   $this->issuance->form->name,
                'form_alias'      =>  $this->issuance->form->alias,
                'form_code'      =>   $this->issuance->form->code,
                'effective_from' =>   $this->issuance->form->effective_from,
                'effective_to'   =>   $this->issuance->form->effective_to,
                'deadline'       =>   $this->issuance->deadlined_at,
                'url'            =>    url('/')
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
