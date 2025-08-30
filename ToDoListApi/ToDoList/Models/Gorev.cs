using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ToDoList.Models
{
    public class Gorev
    {
        public int ID   { get; set; }

        [Required(ErrorMessage ="Bu alan zorunludur")]
        [StringLength(maximumLength:50,ErrorMessage ="Bu alan en fazla 50 karakter olmalıdır")]
        public string Baslik {  get; set; }

        public bool TamamlandiMi { get; set; } = false;

        public DateTime OlusturmaTarihi { get; set; } =DateTime.Now;
    }
}