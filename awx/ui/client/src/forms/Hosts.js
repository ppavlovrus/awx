/*************************************************
 * Copyright (c) 2015 Ansible, Inc.
 *
 * All Rights Reserved
 *************************************************/

 /**
 * @ngdoc function
 * @name forms.function:Hosts
 * @description This form is for adding/editing a host on the inventory page
*/

export default
    angular.module('HostFormDefinition', [])
        .factory('HostForm', ['i18n', function(i18n) {
        return {

            addTitle: i18n._('Create Host'),
            editTitle: '{{ host.name }}',
            name: 'host',
            basePath: 'hosts',
            well: false,
            formLabelSize: 'col-lg-3',
            formFieldSize: 'col-lg-9',
            iterator: 'host',
            headerFields:{
                enabled: {
                    class: 'Form-header-field',
                    ngClick: 'toggleHostEnabled(host)',
                    type: 'toggle',
                    awToolTip: "<p>" +
                        i18n._("Indicates if a host is available and should be included in running jobs.") +
                        "</p><p>" +
                        i18n._("For hosts that are part of an external" +
                               " inventory, this flag cannot be changed. It will be" +
                               " set by the inventory sync process.") +
                        "</p>",
                    dataTitle: i18n._('Host Enabled'),
                }
            },
            fields: {
                name: {
                    label: i18n._('Host Name'),
                    type: 'text',
                    required: true,
                    awPopOver: "<p>" +
                    i18n._("Provide a host name, ip address, or ip address:port. Examples include:") +
                        "</p>" +
                        "<blockquote>myserver.domain.com<br/>" +
                        "127.0.0.1<br />" +
                        "10.1.0.140:25<br />" +
                        "server.example.com:25" +
                        "</blockquote>",
                    dataTitle: i18n._('Host Name'),
                    dataPlacement: 'right',
                    dataContainer: 'body',
                    ngDisabled: '!(host.summary_fields.user_capabilities.edit || canAdd)'
                },
                description: {
                    label: i18n._('Description'),
                    ngDisabled: '!(host.summary_fields.user_capabilities.edit || canAdd)',
                    type: 'text'
                },
                variables: {
                    label: i18n._('Variables'),
                    type: 'textarea',
                    rows: 6,
                    class: 'Form-formGroup--fullWidth',
                    "default": "---",
                    awPopOver: "<p>" + i18n._("Enter inventory variables using either JSON or YAML syntax. Use the radio button to toggle between the two.") + "</p>" +
                        "JSON:<br />\n" +
                        "<blockquote>{<br />&emsp;\"somevar\": \"somevalue\",<br />&emsp;\"password\": \"magic\"<br /> }</blockquote>\n" +
                        "YAML:<br />\n" +
                        "<blockquote>---<br />somevar: somevalue<br />password: magic<br /></blockquote>\n" +
                        '<p>' + i18n.sprintf(i18n._('View JSON examples at %s'), '<a href="http://www.json.org" target="_blank">www.json.org</a>') + '</p>' +
                        '<p>' + i18n.sprintf(i18n._('View YAML examples at %s'), '<a href="http://docs.ansible.com/YAMLSyntax.html" target="_blank">docs.ansible.com</a>') + '</p>',
                    dataTitle: i18n._('Host Variables'),
                    dataPlacement: 'right',
                    dataContainer: 'body'
                },
                inventory: {
                    type: 'hidden',
                    includeOnEdit: true,
                    includeOnAdd: true
                }
            },

            buttons: {
                cancel: {
                    ngClick: 'formCancel()',
                    ngShow: '(host.summary_fields.user_capabilities.edit || canAdd)'
                },
                close: {
                    ngClick: 'formCancel()',
                    ngShow: '!(host.summary_fields.user_capabilities.edit || canAdd)'
                },
                save: {
                    ngClick: 'formSave()',
                    ngDisabled: true,
                    ngShow: '(host.summary_fields.user_capabilities.edit || canAdd)'
                }
            },
        };
    }]);
