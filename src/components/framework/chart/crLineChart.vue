<script>
  import { Line } from 'vue-chartjs';
    export default {
      extends: Line,
      props: ['data', 'config'],
      mounted: function () {
        this.renderChart(this.data, this.config);

      }
    };
</script>
