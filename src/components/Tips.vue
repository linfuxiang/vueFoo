<template>
    <div class="hello">
        <table cellspacing="0" class="m10">
            <tr>
            	<th rowspan="7" class="tip">
            		Tips
            	</th>
                <th class="th-1st">指数</th>
                <th class="th-2nd">等级</th>
                <th class="th-3rd">空气质量查询网温馨提示</th>
            </tr>
            <tr>
                <td class="td-1st">0-50</td>
                <td class="td-2nd">一级<strong class="level1">优</strong></td>
                <td class="td-3rd">可多参加户外活动呼吸新鲜空气</td>
            </tr>
            <tr>
                <td class="td-1st">51-100</td>
                <td class="td-2nd">二级<strong class="level2">良</strong></td>
                <td class="td-3rd">除少数对某些污染物特别容易过敏的人群外，其他人群可以正常进行室外活动。</td>
            </tr>
            <tr>
                <td class="td-1st">101-150</td>
                <td class="td-2nd">三级<strong class="level3">轻度污染</strong></td>
                <td class="td-3rd">敏感人群需减少体力消耗较大的户外活动</td>
            </tr>
            <tr>
                <td class="td-1st">151-200</td>
                <td class="td-2nd">四级<strong class="level4">中度污染</strong></td>
                <td class="td-3rd">敏感人群应尽量减少外出，一般人群适当减少户外运动</td>
            </tr>
            <tr>
                <td class="td-1st">201-300</td>
                <td class="td-2nd">五级<strong class="level5">重度污染</strong></td>
                <td class="td-3rd">敏感人群应停止户外运动，一般人群尽量减少户外运动</td>
            </tr>
            <tr class="tr-last">
                <td class="td-1st">&gt;300</td>
                <td class="td-2nd">六级<strong class="level6">严重污染</strong></td>
                <td class="td-3rd">除有特殊需要的人群外，尽量不要留在室外</td>
            </tr>
        </table>
    </div>
</template>
<script>
export default {
    data() {
        return {
            
        }
    },
    methods: {
    	
    },
    mounted() {
        
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	$thBgColor: #c5de89;
	$thFontColor: #fff;

	$level1BgColor: #4cc74c;
	$level2BgColor: #FFBB17;
	$level3BgColor: #C67901;
	$level4BgColor: #EB111B;
	$level5BgColor: #B3065B;
	$level6BgColor: #600202;

	table{
		width: 700px;
		position: fixed;
		font-size: 14px;
		right: -670px;
		top: 0px;
		transition: right 1s;
		&:hover{
			th:nth-of-type(1){
				opacity: 0;
			}
			right: 0px;
		}
		th{
			background-color: $thBgColor;
			color: $thFontColor;
			padding: 2px 0;
			&:nth-of-type(1){
				width: 30px;
				background-color: transparent;
				color: black;
				vertical-align: top;
			}
			&:nth-of-type(2){
				width: 60px;
			}
			&:nth-of-type(3){
				width: 110px;
			}
			&:nth-of-type(4){
				width: 500px;
			}
		}
		td{
			background-color: white;
		}
		.level1{
			color: $level1BgColor;
		}
		.level2{
			color: $level2BgColor;
		}
		.level3{
			color: $level3BgColor;
		}
		.level4{
			color: $level4BgColor;
		}
		.level5{
			color: $level5BgColor;
		}
		.level6{
			color: $level6BgColor;
		}
		tr:nth-of-type(odd){
			// background-color: #D3FFDF;
		}
		tr:nth-of-type(even){
			// background-color: #FFE9C4;
		}
		tr:not(:first-child):hover{
			background-color: #D3FFDF;
		}
	}
	
</style>
