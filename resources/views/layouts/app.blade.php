<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    {{-- <meta name="csrf-token" content="{{ csrf_token() }}"> --}}

    <title>{{ config('app.name', 'E-forms Management System') }}</title>
    <link rel="icon" href="./public/favicon.ico"></link>

    @viteReactRefresh
    @vite(['resources/css/app.css','resources/js/main.jsx'])

    <script type="text/javascript">
        window.Laravel = {
            csrfToken: "{{ csrf_token() }}",
        }
    </script>
</head>
<body>
    <div id="root"></div>
</body>
</html>
