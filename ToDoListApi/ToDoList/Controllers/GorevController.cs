using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ToDoList.Models;

namespace ToDoList.Controllers
{
    public class GorevController : ApiController
    {
        ToDoListEntityModel db= new ToDoListEntityModel();


        [HttpGet]
        public IHttpActionResult GorevGetir()
        {
            List <Gorev> gorevler = db.Gorevler.ToList();
            return Ok(gorevler);
        }
        [HttpPost]
        public IHttpActionResult GorevEkle(Gorev yeniGorev)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);
            db.Gorevler.Add(yeniGorev);
            db.SaveChanges();
            return Ok(yeniGorev);

        }
        [HttpPut]
        public IHttpActionResult GorevGuncelle(int id, Gorev guncellenen)
        {
            Gorev gorev = db.Gorevler.Find(id);

            gorev.Baslik=guncellenen.Baslik;
            gorev.TamamlandiMi = guncellenen.TamamlandiMi;

            db.SaveChanges();

            return Ok(gorev);
        }

        [HttpDelete]
        public IHttpActionResult GorevSil(int id)
        {
            Gorev gorev = db.Gorevler.Find(id);
            db.Gorevler.Remove(gorev);
            db.SaveChanges();
            return Ok(gorev);
        }
    }
}
