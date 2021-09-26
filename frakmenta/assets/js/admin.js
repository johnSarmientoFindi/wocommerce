/*
    * 2021 Sistemas findirect
    *
    * NOTICE OF LICENSE
    *
    * This source file is subject to the Academic Free License (AFL 3.0)
    * that is bundled with this package in the file LICENSE.txt.
    * It is also available through the world-wide-web at this URL:
    * http://opensource.org/licenses/afl-3.0.php
    *
    * DISCLAIMER
    *
    * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
    * versions in the future. If you wish to customize PrestaShop for your
    * needs please refer to http://www.prestashop.com for more information.
    *
    *  @author Jose Baez
    *  @author 2021
    *  @author <desarrollo@frakmenta.com>
    *  @copyright Sistemas findirect
    *
    *  @license http://opensource.org/licenses/osl-3.0.php Open Software License (OSL 3.0)
*/

jQuery(document).ready(function($) {

    init();

    /* Display correct block according to different choices. */
    function displayConfiguration() {

        jQuery('#standard-credentials').slideDown();

        // jQuery('#standard-credentials').slideUp();
        return;
    }

    if (jQuery('#frakmenta-wrapper').length != 0) {
        jQuery('.hide').hide();
        displayConfiguration();
    }

    if (jQuery('#fk_mode').val()==0)
        jQuery('#standard-credentials').hide();

    jQuery('#test_fk_connection').click(function() {
        url = this.dataset.url;
        apikey = this.dataset.token;
        let price_product = 70;
        jQuery('#test_fk_conection_result').removeClass('text-danger text-success');
        jQuery('#test_fk_conection_result').html();
        var xhr = new XMLHttpRequest();

        xhr.addEventListener("readystatechange", function(data, status) {
            if(this.readyState === 4 && this.status==200) 
            {
                jQuery('#test_fk_conection_result').addClass("text-sucess");
                jQuery('#test_fk_conection_result').html("Conexión exitosa");
            }
            else if (this.readyState === 4 && this.status!=200) 
            {
                jQuery('#test_fk_conection_result').addClass("text-danger");
                jQuery('#test_fk_conection_result').html("Conexión fallida");
            }
        });
        
        var url = url + "/api/fk/v2/installment/simulator?apikey="+ apikey + "&product_price="+ price_product;
        xhr.open("GET", url);
        xhr.send();

    });
});

function init()
{    
    account = jQuery('#fk_exists').val();

    if (account==0) {
        jQuery('#credentials').slideUp();
        jQuery('#test-fk').slideUp();
        jQuery('#fk_register').slideDown();
        frakmenta_mode(0);
    }
    else {
        jQuery('#fk_register').slideUp();
        jQuery('#credentials').slideDown();
        jQuery('#configuration').slideDown();
        jQuery('#fk-test-conn').slideDown();
        jQuery('#test-fk').slideDown();
        if (document.getElementById('fk_mode'))
            frakmenta_mode(document.getElementById('fk_mode').value);
    }

    if (typeof(Frakmenta_account) !== 'undefined')
        frakmentaAccount(Frakmenta_account);
}

function frakmentaAccount(account)
{
    if (account==0)
    {
        jQuery('#credentials').slideUp();
        jQuery('#test-fk').slideUp();
        jQuery('#fk-test-conn').slideUp();
        jQuery('#configuration').slideUp();
        jQuery('#fk_register').slideDown();
    }
    else 
    {
        jQuery('#fk_register').slideUp();
        jQuery('#credentials').slideDown();
        jQuery('#configuration').slideDown();
        jQuery('#fk-test-conn').slideDown();
        jQuery('#test-fk').slideDown();
    }
    frakmenta_mode(jQuery('#fk_mode').val());
}

function frakmenta_mode(type) {
    if (type==0)
    {
        jQuery('.prod_fk').removeClass('teal');
        jQuery('.test_fk').addClass('teal');
        jQuery('#standard-credentials').hide();
        jQuery('#fk_private_key').removeAttr('required');
        jQuery('#fk_public_key').removeAttr('required');
        jQuery('#fk_merchant_id').removeAttr('required');
    }
    else
    {
        jQuery('#fk_private_key').prop('required', true);
        jQuery('#fk_public_key').prop('required', true);
        jQuery('#fk_merchant_id').prop('required', true);
        jQuery('.test_fk').removeClass('teal');
        jQuery('.prod_fk').addClass('teal');
        jQuery('#standard-credentials').show();
    }

    if (document.getElementById('fk_mode'))
        document.getElementById('fk_mode').value=type;
}

function validate_config_fk()
{
    jQuery('.error-config-frakmenta').fadeOut();

    if (jQuery('#fk_mode').val()=="-1") 
    {
        jQuery('.error-config-frakmenta').fadeIn();
        return false;
    }

}
