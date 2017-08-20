# sdata.js
小巧快速的将json数据分布到html标签上的插件


### 第一步 > 引入文件
```javascript
<script src="http://cdn.bootcss.com/jquery/2.2.2/jquery.min.js"></script>
<script src="sdata.js"></script>
```
这个插件使用jQuery编写，所以必须引入jQuery文件

### 第二步 > 输出数据到页面
```javascript
<script>

  var data={
            name:"张三",
            age:"19",
            phone:"123456789"
           }

  sdata(data,"dataname")

</script>
```
```html
<div sdata="dataname-name"></div>
<div sdata="dataname-age"></div>
<div sdata="dataname-phone"></div>
```
输出结果
```html
<div sdata="dataname-name">张三</div>
<div sdata="dataname-age">19</div>
<div sdata="dataname-phone">123456789</div>
```
### 第三步 > 为标签设置属性
```javascript
<script>

  var data={
            color:"#ffffff",
            text:"hello",
            1:{
                color:"#000000",
                text:"hahaha"
              }
           }

  sdata(data,"dataname")

</script>
```
```html
<div sdata="dataname" attr="html:text,color:color"></div>
<div sdata="dataname-1" attr="html:text,color:color"></div>
```
输出结果
```html
<div sdata="dataname" attr="html:text,color:color" color="#ffffff">hello</div>
<div sdata="dataname-1" attr="html:text,color:color" color="#000000">hahaha</div>
```
attr的属性：<br/>
* html表示输出到标签内容<br/>
* 其他任何属性都将被设置为标签属性<br/>
* 如果设置attr=""，那么标签将不进行任何输出，包括标签内容和属性
### 第四步 > 使用自动克隆
```javascript
<script>

  var data={
    "0": {
        "name": "张三",
        "age": "20",
        "phone": "13030303030"
    },
    "1": {
        "name": "李四",
        "age": "30",
        "phone": "12020202020"
    },
    "2": {
        "name": "王五",
        "age": "40",
        "phone": "11010101010"
    }
  }
  
  
  sdata(data,"dataname")
  
</script>
```
```html
<div clone sdata="dataname-i" attr="">
  <div sdata="dataname-i-name"></div>
  <div sdata="dataname-i-age"></div>
  <div sdata="dataname-i-phone"></div>
</div>
```
输出结果
```html
<div sdata="dataname-0" attr="">
  <div sdata="dataname-0-name">张三</div>
  <div sdata="dataname-0-age">20</div>
  <div sdata="dataname-0-phone">13030303030</div>
</div>
<div sdata="dataname-1" attr="">
  <div sdata="dataname-1-name">李四</div>
  <div sdata="dataname-1-age">30</div>
  <div sdata="dataname-1-phone">12020202020</div>
</div>
<div sdata="dataname-2" attr="">
  <div sdata="dataname-2-name">王五</div>
  <div sdata="dataname-2-age">40</div>
  <div sdata="dataname-2-phone">11010101010</div>
</div>
```
自动克隆是给定一个标签模板，然后根据json中指定数据的数量，自动克隆出相应数量的标签。
* 主标签（添加clone属性的标签）的sdata中，需要循环的键用"i"表示，并且"i"必须为主标签sdata的最后一个键
* 子标签的sdata中，需要循环的键也用"i"表示

* **如果需要克隆的主标签下存在子标签，那么主标签必须添加attr=""，如果主标签需要给自己设置属性，那么将attr中的属性设置为除html以外的任意属性，这么做是为了不让主标签输出任何内容，否则主标签输出的内容将替换掉子标签**

### 最后 > 函数及参数
### sdata(json,dataname)
**json** 类型为[json对象]，传入需要部署到标签上的json数据<br/>
**dataname** 类型为[字符串]，自定义该数据的名称，在标签上的sdata属性会使用该名称
<br/><br/>
### sdata_get(url,dataname,callback) 该函数用ajax的get方法获取远程json数据

**url** 类型为[字符串]，远程json数据的地址<br/>
**dataname** 类型为[字符串]，自定义该数据的名称，在标签上的sdata属性会使用该名称<br/>
**callback** 类型为[函数]，在获取数据成功并且将数据成功部署到标签上后，会调用该回调函数，该函数有一个参数data为获取到的json对象。
<br/><br/>
### sdata_post(url,postdata,dataname,callback) 该函数用ajax的post方法获取远程json数据

**url** 类型为[字符串]，远程json数据的地址<br/>
**postdata** 类型为[json对象]，发送到服务器的post数据<br/>
**dataname** 类型为[字符串]，自定义该数据的名称，在标签上的sdata属性会使用该名称<br/>
**callback** 类型为[函数]，在获取数据成功并且将数据成功部署到标签上后，会调用该回调函数，该函数有一个参数data为获取到的json对象。


