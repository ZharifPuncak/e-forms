<p>Dear {{ $name }},</p>

<p>This is an final reminder that the <strong>{{ $form_name }}</strong> requires your acknowledgment. Your confirmation is essential to ensure compliance and proper record-keeping.</p>

<h3>What You Need to Do:</h3>
<ol>
    <li>Sign in to <a href="{{ $url }}" target="_blank">{{ $url }}</a> using your IC No. The default password is <strong>'abcd1234'</strong>.</li>
    <li>Navigate to the <strong>Forms</strong> page, where you will find the <strong>{{ $form_name }}</strong>.</li>
    <li>Review the {{ $form_name }}.</li>
    <li>Sign and submit your acknowledgment for {{ $form_name }} by <strong>{{ $deadline }}</strong>.</li>
</ol>

<p>Your prompt action is greatly appreciated. ** Please neglect this mail if you already acknowledge {{ $form_name }}.</p>

<p>Thank you for your cooperation.</p>

