<html lang="en">
<head>
    <title>{{ $formattedForm['name']}} Report</title>
    <script src="https://cdn.tailwindcss.com"></script>

    <style>
    @media print {
        table { 
            page-break-inside: auto;
        }
        tr {
            page-break-inside: avoid; 
            page-break-after: auto; 
        }
        tr:nth-child(22n) { /* Adjust this for your needs */
            page-break-before: always;
        }

        @page {
            margin-top: 150px; /* Padding at the top of each page */
            margin-bottom: 50px;
            
        }
    }

    body {
        padding-top: 30px; /* Additional padding for each page */
        
    }

</style>
</head>
<body>
    @include('reports.form.details')
          @pageBreak 
    @if($formattedForm['acknowledgements'])
         @include('reports.form.acknowledgements')
    @endif
</body>
</html>