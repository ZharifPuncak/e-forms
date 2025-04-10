

<div style="padding-left : 30px;padding-right : 30px;">


    <div class="mb-2" style="text-decoration: underline;text-underline-offset: 2px;">
          <small > Acknowledgement Completed List  </small>
    </div>
    <table class="w-full text-left mb-8 border border-gray-100">
        <tbody>
             <tr>
                <th class="py-2 text-gray-700 border border-gray-100"><span class="ml-1 mr-1"><small>No</small></span></th>
                <th class="py-2 text-gray-700 border border-gray-100"><span class="ml-1 mr-1"><small>Name</small></span></th>
                <th class="py-2 text-gray-700 border border-gray-100"><small class="ml-1 mr-1">Company </small></th>
                <th class="py-2 text-gray-700 border border-gray-100"><small class="ml-1 mr-1">Department </small></th>
                <th class="py-2 text-gray-700 border border-gray-100"><small class="ml-1 mr-1">Submitted</small></th>
            </tr>
   
            @if($formattedForm['acknowledgements'])
                @foreach($formattedForm['acknowledgements'] as $acknowledgement)
                <?php
                    $data = json_encode($acknowledgement);
                    $data = json_decode($data, true);
                ?>
                    <tr>
                        <td class="py-2 text-gray-700 border border-gray-100"><span class="ml-1 mr-1"><small>{{  $loop->iteration }}</small></span></td>
                        <td class="py-2 text-gray-700 border border-gray-100"><span class="ml-1 mr-1"><small>{{ $data['name'] }}</small></span></td>
                        <td class="py-2 text-gray-700 border border-gray-100"><small class="ml-1 mr-1">{{ $data['company'] }}</small></td>
                        <td class="py-2 text-gray-700 border border-gray-100"><small class="ml-1 mr-1">{{ $data['department'] }}</small></td>
                        <td class="py-2 text-gray-700 border border-gray-100"><small class="ml-1 mr-1">{{ $data['submitted'] }}</small></td>
                    </tr>
                @endforeach
            @endif
           
        </tbody>
    </table>
 </div>
  
