<template>
  <div >
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
    },
    
  },
  data() {
    return {
      show_Letter: '',
      active:false,
    }
  },
  methods: {
    anchorJump:function(id, event) {
      this.show_Letter = id;
      this.active = true;
      setTimeout(() => {
        this.active = false;
      },2000)
      this.$emit('jump',id)
    }
  }
}
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
  left: 40%;
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
  right: 20%;
  height: 100%;
  text-align: center;
  z-index: 111;
  background: #fff;
  border-left: 1px solid #f7f7f7;
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