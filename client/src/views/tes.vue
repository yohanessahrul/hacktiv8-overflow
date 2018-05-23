
      let currentDislike = this.$store.state.questions[index].dislike
      for (let i = 0; i < currentDislike.length; i++) {
        if (currentDislike[i] === localStorage.getItem('id')) {
          console.log('Data ada -', i + 1)
          this.availDislike = true
        }
      }

      if (this.availDislike === false) {
        let payload = {
          id: id,
          index: index
        }
        this.$store.dispatch('incDislike', payload)
      } else {
        alert('Anda sudah pernak Dislike !!!')
      }