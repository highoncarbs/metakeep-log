<template>
  <div>
    <div class>
      <div class="field is-grouped is-grouped-multiline">
        <div class="control" v-if="files.length == 0">
          <div class="file is-light">
            <label class="file-label">
              <input
                ref="imageinput"
                class="file-input"
                @change.prevent="listUploads"
                accept="image/*"
                type="file"
                name="ref-file"
              />
              <span class="file-cta">
                <b-icon icon="cloud-upload" class="mr-3" />

                <span class="file-label">Choose a file…</span>
              </span>
            </label>
          </div>
        </div>
        <div class="control">
          <button class="button is-danger is-light" @click="clearUploads">
            <b-icon icon="delete" class="mr-3" />
            <span>Clear</span>
          </button>
        </div>
      </div>
      <br />

      <div
        v-if="files.length == 0"
        @click="$refs.imageinput.click()"
        class="has-text-grey-lighter has-text-centered py-6 has-background-white-bis"
        style="border:2px dashed lightgrey; border-radius:10px; cursor:pointer;"
      >
        <b-icon icon="image-plus" size="is-large"></b-icon>
        <br />
        <p class="is-size-4 has-text-weight-medium">Add Product image</p>
      </div>

      <div v-for="(file , index) in files" :key="index">
        <figure class="image">
          <img class="image-preview" v-bind:src="imageUrlArray | getIndexedImage(index)" />
        </figure>
        <div class="content">
          <p class="has-text-weight-bold">
            <span class="has-text-grey">{{ index +1 }}.</span>
            {{ file.name }}
            <br />
            <span class="has-text-grey has-text-weight-normal">
              File size: {{file.size |
              formatBytes }}
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      imageData: null,
      files: [],
      imageUrlArray: [],
    };
  },
  watch: {
    files: function () {
      this.$emit("input", this.files[0]);
    },
  },
  filters: {
    getIndexedImage(val, index) {
      return val[index];
    },

    formatBytes(a, b) {
      if (0 == a) return "0 Bytes";
      var c = 1024,
        d = b || 2,
        e = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
        f = Math.floor(Math.log(a) / Math.log(c));
      return parseFloat((a / Math.pow(c, f)).toFixed(d)) + " " + e[f];
    },
  },
  methods: {
    listUploads(e) {
      let files = e.srcElement.files;

      let self = this;

      for (var index = 0; index < files.length; index++) {
        // generate a new FileReader object
        var reader = new FileReader();
        self.files.push(files[index]);
        // inject an image with the src url
        reader.onload = function (event) {
          const imageUrl = event.target.result;
          // const thumb = document.querySelectorAll('.thumb')[index];
          self.imageUrlArray.push(imageUrl);
        };

        // when the file is read it triggers the onload
        // event above.
        reader.readAsDataURL(files[index]);
      }
    },
    deleteItem: function (index) {
      this.files.splice(index, 1);
      this.imageUrlArray.splice(index, 1);
    },
    clearUploads() {
      this.imageUrlArray = [];
      this.files = [];
    },
  },
};
</script>

<style>
.image-input {
  display: block;
  width: 200px;
  height: 200px;
  cursor: pointer;
  background-size: cover;
  background-position: center center;
}

.placeholder {
  border-radius: 3px;
  background: #f0f0f0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.button-icon {
  border-radius: 50%;
  padding: 10px 10px 5px 10px;
  background-color: rgba(0, 0, 0, 0.5);
}
.placeholder-x {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.placeholder:hover {
  background: #e0e0e0;
}

.file-input {
  display: none;
}

.noti-x {
  border: 1px solid rgba(119, 136, 153, 0.5);
  border-top: 10px solid rgba(119, 136, 153, 0.5);
  border-radius: 0 0 10px 10px;
  background-color: #fff;
}
</style>