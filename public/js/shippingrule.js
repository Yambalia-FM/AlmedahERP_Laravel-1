
function addRow(){
    if($('#no-data')[0]){
        deleteItemRow($('#no-data').parents('tr'));
    }
    let lastRow = $('#country-table tr:last');
    let nextID = (lastRow.length != 0) ? lastRow.data('id') + 1 : 0;
    $('#country-table').append(
    `<tr data-id="${nextID}">
        
        <td id="mr-code-input-${nextID}" class="mr-code-input">
        <div class="row">
        <div class="col-11">
        <input type="text" name="Shipping_Amount" class="form-control">
        </div>
        <div class="col-1">
        <a id="" class="btn delete-btn" href="#" role="button">
        <i class="fa fa-minus" aria-hidden="true"></i>
        </a>
        </div>
        </div>
        </td>
    </tr>`);
}

      function openField() {
        var check = document.getElementById('include');
        if (check.checked) {
          document.getElementById('cont').style.display = 'block';
        } else
          document.getElementById('cont').style.display = 'none';
      }
