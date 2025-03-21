<style>
    .pdf-header {
        font-size: 14px; /* Adjust font size */
        text-align: center;
        height: '100%'; /* Adjust height */
        width: 100vw;
    }
</style>

<div class="pdf-header w-full" style="padding : 30px">

    <div class="text-gray-900" style="display: grid; place-items: center; text-align: center;">
            <h3 class="mt-2" style="max-width: 600px;margin-bottom : 0px;">
               {{ $formattedForm['name'] }} Report
            </h3>
            <small class="mt-4" style="color: grey;margin-top : 6px;"> ( {{$formattedForm['alias'] }} / {{ $formattedForm['code'] }} )</small>
    </div>
    <div>
            <small class="mt-2" style="margin-top : 4px !important;font-style:italic;color : 'grey' !important;">  <span style="color: grey;">{{ $formattedForm['date'] }}</span></small>
    </div>
<div>