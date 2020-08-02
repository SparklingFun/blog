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
                window.document.execCommand('Copy')
                ipt.blur()
                document.body.removeChild(ipt)
                ipt = null
            }
            var canvas = document.getElementById('canvas');
            // 基于短链接服务生成短链
            $.get('https://arcto.xyz/create?url=' + encodeURIComponent(window.location.href), function(data) {
                if (data.data.code === -1) console.error(data.data.data.msg);
                // 正常情况均会返回URL（无论新的或是已存在的）
                QRCode.toCanvas(canvas, 'https://arcto.xyz/s/' + data.data.data.short, function (error) {
                    if (error) console.error(error);
                })
            })
        });`;
        return <Fragment>
            <aside class="_tool-share">
                <span></span>
                <canvas id="canvas"></canvas>
            </aside>
            {/* <script src="https://unpkg.com/axios@0.19.2/dist/axios.min.js" defer={true}></script> */}
            <script src="https://unpkg.com/qrcode@1.4.4/build/qrcode.min.js" defer={true}></script>
            <script dangerouslySetInnerHTML={{ __html: js }} defer={true}></script>
        </Fragment>;
    }
}