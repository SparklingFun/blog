/**
 * ShareComponent use private services
 */
const { Component, Fragment } = require('inferno');

/**
 * @example
 * <ShareComponent />
 */
module.exports = class extends Component {
    render() {
        const js = `document.addEventListener('DOMContentLoaded', function () {
            // functions
            // have bugs...
            function copyToClipboard(text) {
                if (text === "") return;
                var ipt = document.createElement('input')
                ipt.setAttribute(
                    'style',
                    'position:absolute;z-index:-1;width:1px;height:1px;top:-1px;opacity:0;-webkit-user-select: text;'
                )
                document.body.appendChild(ipt)
                ipt.value = text
                // ipt.select()
                if (/iphone|ipad|ios/.test(navigator.userAgent.toLowerCase())) {
                    var oldContentEditable = ipt.contentEditable
                    var oldReadOnly = ipt.readOnly
                    var range = document.createRange()
            
                    ipt.contentEditable = true
                    ipt.readOnly = false
                    range.selectNodeContents(ipt)
            
                    var s = window.getSelection()
                    s.removeAllRanges()
                    s.addRange(range)
            
                    ipt.setSelectionRange(0, 999999) // A big number, to cover anything that could be inside the element.
            
                    ipt.contentEditable = oldContentEditable
                    ipt.readOnly = oldReadOnly
                } else {
                    ipt.select()
                }
                document.execCommand('Copy')
                ipt.blur()
                document.body.removeChild(ipt)
                ipt = null
            }

            // Event Listeners
            // QRCode
            var shareQrcodeSwitcher = document.getElementById('_tool-share-qrcode-switcher');
            var shareQrcodeBox =  document.getElementById('_tool-share-qrcode-box');
            var shareQrcodeSwitcherStatus = shareQrcodeSwitcher.dataset.status;
            var __shortText__ = '';
            $(shareQrcodeSwitcher).on('click', function() {
                shareQrcodeSwitcherStatus = !shareQrcodeSwitcherStatus
                if(shareQrcodeSwitcherStatus) {
                    shareQrcodeBox.style.display = "block";
                } else {
                    shareQrcodeBox.style.display = "none";
                }
            })
            // Copy Link
            var shareQrcodeCopy = document.getElementById('_tool-share-qrcode-copy');
            var copiedFlag = false;
            $(shareQrcodeCopy).on('click', function() {
                if(__shortText__ && !copiedFlag) {
                    copyToClipboard('https://arcto.xyz/s/'+__shortText__);
                    copiedFlag = true;
                    shareQrcodeCopy.text = "已成功复制链接~";
                    setTimeout(function() {
                        copiedFlag = false;
                        shareQrcodeCopy.text = "复制分享链接";
                    }, 300);
                }
            })

            // main
            var canvas = document.getElementById('_tool-share-qrcode-canvas');
            var container = document.getElementById('_tool-share-qrcode-wrapper');
            // 基于短链接服务生成短链
            $.get('https://arcto.xyz/create?url=' + encodeURIComponent(window.location.href), function(data) {
                if (data.data.code === -1) {
                    console.error(data.data.data.msg);
                    container.style.display = "none";
                }
                __shortText__ = data.data.data.short;
                // 正常情况均会返回URL（无论新的或是已存在的）
                QRCode.toCanvas(canvas, 'https://arcto.xyz/s/' + data.data.data.short, function (error) {
                    if (error) console.error(error);
                })
            })
        });`;
        return <Fragment>
            <aside class="_tool-share" id="_tool-share-qrcode-wrapper">
                <span id="_tool-share-qrcode-switcher" data-status={false}>二维码分享</span><span id="_tool-share-qrcode-copy" style="display: none;">复制分享链接</span>
                <figure id="_tool-share-qrcode-box" style="display: none;">
                    <canvas id="_tool-share-qrcode-canvas"></canvas>
                </figure>
            </aside>
            {/* <script src="https://unpkg.com/axios@0.19.2/dist/axios.min.js" defer={true}></script> */}
            <script src="https://unpkg.com/qrcode@1.4.4/build/qrcode.min.js" defer={true}></script>
            <script dangerouslySetInnerHTML={{ __html: js }} defer={true}></script>
        </Fragment>;
    }
}