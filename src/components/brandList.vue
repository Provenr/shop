<template>
  <div>
    <!-- <div class="tab-content" id="J_tabContent">
      <div class="tab-menu" id="J_tabMenu">
        <ul class="tab-ul">
          <div class="tab-list" v-for="(item,index) in brandListA" :key="index">
            <a v-if="index === 0" href=""><span class="city-letter" id="A1">{{item.first_letter}}</span></a>
            <ul style="padding-right:0.65rem;">
              <li :id="item.id" class="tab-desc">{{item.name}}</li>
            </ul>
          </div>
          <div class="tab-list" v-for="(item,index) in brandListB" :key="index">
            <a v-if="index === 0" href=""><span class="city-letter" id="B1">{{item.first_letter}}</span></a>
            <ul style="padding-right:0.65rem;">
              <li :id="item.id" class="tab-desc">{{item.name}}</li>
            </ul>
          </div>
          <div class="tab-list" v-for="(item,index) in brandListC" :key="index">
            <a v-if="index === 0" href=""><span class="city-letter" id="C1">{{item.first_letter}}</span></a>
            <ul style="padding-right:0.65rem;">
              <li :id="item.id" class="tab-desc">{{item.name}}</li>
            </ul>
          </div>
          <div class="tab-list" v-for="(item,index) in brandListD" :key="index">
            <a v-if="index === 0" href=""><span class="city-letter" id="D1">{{item.first_letter}}</span></a>
            <ul style="padding-right:0.65rem;">
              <li :id="item.id" class="tab-desc">{{item.name}}</li>
            </ul>
          </div>
          <div class="tab-list" v-for="(item,index) in brandListE" :key="index">
            <a v-if="index === 0" href=""><span class="city-letter" id="E1">{{item.first_letter}}</span></a>
            <ul style="padding-right:0.65rem;">
              <li :id="item.id" class="tab-desc">{{item.name}}</li>
            </ul>
          </div>
          <div class="tab-list" v-for="(item,index) in brandListF" :key="index">
            <a v-if="index === 0" href=""><span class="city-letter" id="F1">{{item.first_letter}}</span></a>
            <ul style="padding-right:0.65rem;">
              <li :id="item.id" class="tab-desc">{{item.name}}</li>
            </ul>
          </div>
          <div class="tab-list" v-for="(item,index) in brandListG" :key="index">
            <a v-if="index === 0" href=""><span class="city-letter" id="G1">{{item.first_letter}}</span></a>
            <ul style="padding-right:0.65rem;">
              <li :id="item.id" class="tab-desc">{{item.name}}</li>
            </ul>
          </div>
          <div class="tab-list" v-for="(item,index) in brandListH" :key="index">
            <a v-if="index === 0" href=""><span class="city-letter" id="H1">{{item.first_letter}}</span></a>
            <ul style="padding-right:0.65rem;">
              <li :id="item.id" class="tab-desc">{{item.name}}</li>
            </ul>
          </div>
          <div class="tab-list" v-for="(item,index) in brandListI" :key="index">
            <a v-if="index === 0" href=""><span class="city-letter" id="I1">{{item.first_letter}}</span></a>
            <ul style="padding-right:0.65rem;">
              <li :id="item.id" class="tab-desc">{{item.name}}</li>
            </ul>
          </div>
          <div class="tab-list" v-for="(item,index) in brandListJ" :key="index">
            <a v-if="index === 0" href=""><span class="city-letter" id="J1">{{item.first_letter}}</span></a>
            <ul style="padding-right:0.65rem;">
              <li :id="item.id" class="tab-desc">{{item.name}}</li>
            </ul>
          </div>
          <div class="tab-list" v-for="(item,index) in brandListK" :key="index">
            <a v-if="index === 0" href=""><span class="city-letter" id="K1">{{item.first_letter}}</span></a>
            <ul style="padding-right:0.65rem;">
              <li :id="item.id" class="tab-desc">{{item.name}}</li>
            </ul>
          </div>
          <div class="tab-list" v-for="(item,index) in brandListL" :key="index">
            <a v-if="index === 0" href=""><span class="city-letter" id="L1">{{item.first_letter}}</span></a>
            <ul style="padding-right:0.65rem;">
              <li :id="item.id" class="tab-desc">{{item.name}}</li>
            </ul>
          </div>
          <div class="tab-list" v-for="(item,index) in brandListM" :key="index">
            <a v-if="index === 0" href=""><span class="city-letter" id="M1">{{item.first_letter}}</span></a>
            <ul style="padding-right:0.65rem;">
              <li :id="item.id" class="tab-desc">{{item.name}}</li>
            </ul>
          </div>
          <div class="tab-list" v-for="(item,index) in brandListN" :key="index">
            <a v-if="index === 0" href=""><span class="city-letter" id="N1">{{item.first_letter}}</span></a>
            <ul style="padding-right:0.65rem;">
              <li :id="item.id" class="tab-desc">{{item.name}}</li>
            </ul>
          </div>
          <div class="tab-list" v-for="(item,index) in brandListO" :key="index">
            <a v-if="index === 0" href=""><span class="city-letter" id="O1">{{item.first_letter}}</span></a>
            <ul style="padding-right:0.65rem;">
              <li :id="item.id" class="tab-desc">{{item.name}}</li>
            </ul>
          </div>
          <div class="tab-list" v-for="(item,index) in brandListP" :key="index">
            <a v-if="index === 0" href=""><span class="city-letter" id="P1">{{item.first_letter}}</span></a>
            <ul style="padding-right:0.65rem;">
              <li :id="item.id" class="tab-desc">{{item.name}}</li>
            </ul>
          </div>
          <div class="tab-list" v-for="(item,index) in brandListQ" :key="index">
            <a v-if="index === 0" href=""><span class="city-letter" id="Q1">{{item.first_letter}}</span></a>
            <ul style="padding-right:0.65rem;">
              <li :id="item.id" class="tab-desc">{{item.name}}</li>
            </ul>
          </div>
          <div class="tab-list" v-for="(item,index) in brandListR" :key="index">
            <a v-if="index === 0" href=""><span class="city-letter" id="R1">{{item.first_letter}}</span></a>
            <ul style="padding-right:0.65rem;">
              <li :id="item.id" class="tab-desc">{{item.name}}</li>
            </ul>
          </div>
          <div class="tab-list" v-for="(item,index) in brandListS" :key="index">
            <a v-if="index === 0" href=""><span class="city-letter" id="S1">{{item.first_letter}}</span></a>
            <ul style="padding-right:0.65rem;">
              <li :id="item.id" class="tab-desc">{{item.name}}</li>
            </ul>
          </div>
          <div class="tab-list" v-for="(item,index) in brandListT" :key="index">
            <a v-if="index === 0" href=""><span class="city-letter" id="T1">{{item.first_letter}}</span></a>
            <ul style="padding-right:0.65rem;">
              <li :id="item.id" class="tab-desc">{{item.name}}</li>
            </ul>
          </div>
          <div class="tab-list" v-for="(item,index) in brandListU" :key="index">
            <a v-if="index === 0" href=""><span class="city-letter" id="U1">{{item.first_letter}}</span></a>
            <ul style="padding-right:0.65rem;">
              <li :id="item.id" class="tab-desc">{{item.name}}</li>
            </ul>
          </div>
          <div class="tab-list" v-for="(item,index) in brandListV" :key="index">
            <a v-if="index === 0" href=""><span class="city-letter" id="V1">{{item.first_letter}}</span></a>
            <ul style="padding-right:0.65rem;">
              <li :id="item.id" class="tab-desc">{{item.name}}</li>
            </ul>
          </div>
          <div class="tab-list" v-for="(item,index) in brandListW" :key="index">
            <a v-if="index === 0" href=""><span class="city-letter" id="W1">{{item.first_letter}}</span></a>
            <ul style="padding-right:0.65rem;">
              <li :id="item.id" class="tab-desc">{{item.name}}</li>
            </ul>
          </div>
          <div class="tab-list" v-for="(item,index) in brandListX" :key="index">
            <a v-if="index === 0" href=""><span class="city-letter" id="X1">{{item.first_letter}}</span></a>
            <ul style="padding-right:0.65rem;">
              <li :id="item.id" class="tab-desc">{{item.name}}</li>
            </ul>
          </div>
          <div class="tab-list" v-for="(item,index) in brandListY" :key="index">
            <a v-if="index === 0" href=""><span class="city-letter" id="Y1">{{item.first_letter}}</span></a>
            <ul style="padding-right:0.65rem;">
              <li :id="item.id" class="tab-desc">{{item.name}}</li>
            </ul>
          </div>
          <div class="tab-list" v-for="(item,index) in brandListZ" :key="index">
            <a v-if="index === 0" href=""><span class="city-letter" id="Z1">{{item.first_letter}}</span></a>
            <ul style="padding-right:0.65rem;">
              <li :id="item.id" class="tab-desc">{{item.name}}</li>
            </ul>
          </div>
        </ul>
      </div>
    </div> -->
    <div :class="[active ? 'opacity' : '', 'show_Letter']"><span>{{show_Letter}}</span></div>
    <div class="letter">
      <ul>
        <li v-for="(item, index) in Alphabetic" :key="index" @click="anchorJump(item, $event)">
          <a href="javascript:;">{{item}}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    Alphabetic: {
      type: Array,
      default: () => ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '#']
    }
  },
  data() {
    return {
      show_Letter: '',
      active:false,
    }
  },
  methods: {
    anchorJump:function(anchor, event) {
      this.show_Letter = anchor;
      this.active = true;
      setTimeout(() => {
        this.active = false;
      },2000)
      console.log(anchor)
      console.log(event)
    }
  }
}
</script>
</script>

<style lang="less" scoped>
.opacity{
  opacity: 1 !important;
}
.show_Letter {
  position: fixed;
  color: #09B6F2;
  width: 2.5rem;
  height: 2.5rem;
  line-height: 2.5rem;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  border: #09B6F2 1px solid;
  text-align: center;
  margin-left: -1.25rem;
  opacity: 0;
}
.letter {
  width: auto;
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  text-align: center;
  z-index: 111;
  background: #fff;
  ul {
    padding: 3rem 0;
    li{
      height: 0.8rem;
      text-align: center;
      list-style-type: none;
      a{
        text-decoration: none;
        padding: 0 0.2rem;
        color: #4c4c4c;
        font-size: 0.2rem;
      }
    }
  }
}
</style>