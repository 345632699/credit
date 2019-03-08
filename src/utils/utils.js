let imgTagAddStyle = (htmlstr) => {
  // 正则匹配所有img标签
  // var regex0 = new RegExp("(i?)(\<img)([^\>]+\>)","gmi");
  // 正则匹配不含style="" 或 style='' 的img标签
  // eslint-disable-next-line no-useless-escape
  const regex1 = new RegExp("(i?)(\<img)(?!(.*?style=['\"](.*)['\"])[^\>]+\> )", 'gmi')
  // var regex1 = new RegExp("(i?)(\<img)(?!(.*?style=['\"](.*)['\"])[^\>]+\>)","gmi")
  // 给不含style="" 或 style='' 的img标签加上style=""
  htmlstr = htmlstr.replace(regex1, '$2 style=""$3')
  // console.log('增加style=""后的html字符串：' + htmlstr)
  // 正则匹配含有style的img标签
  // eslint-disable-next-line no-useless-escape
  const regex2 = new RegExp("(i?)(\<img.*?style=['\"])([^\>]+\>)", 'gmi')
  // 在img标签的style里面增加css样式(这里增加的样式：display:block;max-width:100%;height:auto;border:5px solid red;)
  htmlstr = htmlstr.replace(regex2, '$2width:100%;$3')
  // console.log('在img标签的style里面增加样式后的html字符串：' + htmlstr)
  return htmlstr
}

let a = (htmlstr) => {
  // 正则匹配所有img标签
  // var regex0 = new RegExp("(i?)(\<img)([^\>]+\>)","gmi");
  // 正则匹配不含style="" 或 style='' 的img标签
  // eslint-disable-next-line no-useless-escape
  const regex1 = new RegExp("(i?)(\<img)(?!(.*?style=['\"](.*)['\"])[^\>]+\>)", 'gmi')
  // 给不含style="" 或 style='' 的img标签加上style=""
  htmlstr = htmlstr.replace(regex1, '$2 style=""$3')
  console.log('增加style=""后的html字符串：' + htmlstr)
  // 正则匹配含有style的img标签
  // eslint-disable-next-line no-useless-escape
  const regex2 = new RegExp("(i?)(\<img.*?style=['\"])([^\>]+\>)", 'gmi')
  // 在img标签的style里面增加css样式(这里增加的样式：display:block;max-width:100%;height:auto;border:5px solid red;)
  htmlstr = htmlstr.replace(regex2, '$2width=100%;$3')
  console.log('在img标签的style里面增加样式后的html字符串：' + htmlstr)
  return htmlstr
}

export default {
  imgTagAddStyle,
  a
}
