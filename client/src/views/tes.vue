
      console.log(localStorage.getItem('id'))
      let currentLike = this.$store.state.questions[index].like
      console.log(currentLike, 'tipe=', typeof currentLike)

      for (let i = 0; i < currentLike.length; i++) {
        if (currentLike[i] === localStorage.getItem('id')) {
          console.log('Data ada -', i + 1)
          this.avail = true
        }
      }

      if (this.avail === false) {
        
      }


        // let payload = {
        //   id: id,
        //   index: index
        // }

      // this.$store.dispatch('incLike', payload)