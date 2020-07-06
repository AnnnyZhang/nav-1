const $siteList = $('.siteList');
const $lastLi = $siteList.find('li.last');
const str = localStorage.getItem('str');
const hashMap = JSON.parse(str) || [
    {logo: 'A', url: 'https://www.acfun.cn'},
    {logo: 'B', url:'https://www.bilibili.com'}
]
const simplifyUrl = (url)=>{
    return url.replace('https://','')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/,'');
}
const reader = ()=>{
    $siteList.find('li:not(.last)').remove();
    hashMap.forEach((node, index) => {
        const $li = $(`<li>
            <div class='site'>
                <div class='logo'>${node.logo[0]}</div>
                <div class='link'>${simplifyUrl(node.url)}</div>
                <div class='close'>
                    <svg class="icon">
                        <use xlink:href="#icon-close"></use>
                    </svg>
                </div>
            </div>
        </li>`).insertBefore($lastLi);
        $li.on('click', ()=>{
            window.open(node.url);
        });
        $li.on('click', '.close', (e)=>{
            e.stopPropagation();
            hashMap.splice(index, 1);
            reader();
        })
    });
}
reader();
$('.addButton')
    .on('click', ()=>{
        let url = window.prompt('请问你要添加的网址是啥？');
        if(url.indexOf('https://') !== 0){
            url = 'https://' + url;
        }
        const logo = simplifyUrl(url)[0];
        hashMap.push({logo: logo, url: url});
        reader();
    });
window.onbeforeunload = ()=>{
    localStorage.setItem('str', JSON.stringify(hashMap));
}
$(document).on('keypress', (event) =>{
    const {key} = event;
    for(let i=0; i<hashMap.length; i++){
        if(hashMap[i].logo.toLowerCase() === key){
            window.open(hashMap[i].url);
        }
    }
})
