const React = require('react');
import { message } from 'antd';
import { Link } from 'react-router';

var Help = function(){

    return
        <div>
          <h1>介绍</h1>
          <p>Sketch 是一款适用于所有设计师的矢量绘图应用。矢量绘图也是目前进行网页，图标以及界面设计的最好方式。但除了矢量编辑的功能之外，我们同样添加了一些基本的位图工具，比如模糊和色彩校正。</p>
          <p>&nbsp;</p>
          <p>我们尽力让 Sketch 容易理解并上手简单，有经验的设计师花上几个小时便能将自己的设计技巧在Sketch中自如运用。对于绝大多数的数字产品设计，Sketch 都能替代 Adobe Photoshop，Illustrator 和 Fireworks。</p>
          <p>&nbsp;</p>
          <p>&nbsp;</p>
          <h2>为什么选择 Sketch</h2>
          <p>Sketch 是为图标设计和界面设计而生的。它是一个有着出色 UI 的一站式应用，所有你需要的工具都触手可及。在 Sketch 中，画布将是无限大小的，每个图层都支持多种填充模式；我们有最棒的文字渲染和文本式样，还有一些你一定会爱上的文件导出工具。</p>
          <p>&nbsp;</p>
          <p>必要的话，你可以用无限精准的分辨率无关模式来查看画布，或者打开像素模式来查看每一个像素导出后的样子。</p>
          <p>&nbsp;</p>
          <p>但是 Sketch 并不是一个位图编辑应用。也就是说如果你想修正一张照片或者用笔刷来画画，那么这不是你要找的应用。</p>
        </div>;

}

module.exports = Help;
