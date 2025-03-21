<html lang="en">
<head>
    <title>{{ $formattedForm['name']}} Report</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
    @include('reports.form.details')
          @pageBreak 
    @if($formattedForm['acknowledgements'])
         @include('reports.form.acknowledgements')
    @endif
</body>
</html>