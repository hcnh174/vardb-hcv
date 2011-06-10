// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package org.vardb.hcv.sequences;

import java.lang.Integer;
import java.lang.Long;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityManager;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PersistenceContext;
import javax.persistence.Table;
import javax.persistence.Version;
import org.springframework.transaction.annotation.Transactional;
import org.vardb.hcv.sequences.Feedback;

privileged aspect Feedback_Roo_Entity {
    
    declare @type: Feedback: @Entity;
    
    declare @type: Feedback: @Table(name = "feedback");
    
    @PersistenceContext
    transient EntityManager Feedback.entityManager;
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long Feedback.id;
    
    @Version
    @Column(name = "version")
    private Integer Feedback.version;
    
    public Long Feedback.getId() {
        return this.id;
    }
    
    public void Feedback.setId(Long id) {
        this.id = id;
    }
    
    public Integer Feedback.getVersion() {
        return this.version;
    }
    
    public void Feedback.setVersion(Integer version) {
        this.version = version;
    }
    
    @Transactional
    public void Feedback.persist() {
        if (this.entityManager == null) this.entityManager = entityManager();
        this.entityManager.persist(this);
    }
    
    @Transactional
    public void Feedback.remove() {
        if (this.entityManager == null) this.entityManager = entityManager();
        if (this.entityManager.contains(this)) {
            this.entityManager.remove(this);
        } else {
            Feedback attached = Feedback.findFeedback(this.id);
            this.entityManager.remove(attached);
        }
    }
    
    @Transactional
    public void Feedback.flush() {
        if (this.entityManager == null) this.entityManager = entityManager();
        this.entityManager.flush();
    }
    
    @Transactional
    public void Feedback.clear() {
        if (this.entityManager == null) this.entityManager = entityManager();
        this.entityManager.clear();
    }
    
    @Transactional
    public Feedback Feedback.merge() {
        if (this.entityManager == null) this.entityManager = entityManager();
        Feedback merged = this.entityManager.merge(this);
        this.entityManager.flush();
        return merged;
    }
    
    public static final EntityManager Feedback.entityManager() {
        EntityManager em = new Feedback().entityManager;
        if (em == null) throw new IllegalStateException("Entity manager has not been injected (is the Spring Aspects JAR configured as an AJC/AJDT aspects library?)");
        return em;
    }
    
    public static long Feedback.countFeedbacks() {
        return entityManager().createQuery("SELECT COUNT(o) FROM Feedback o", Long.class).getSingleResult();
    }
    
    public static List<Feedback> Feedback.findAllFeedbacks() {
        return entityManager().createQuery("SELECT o FROM Feedback o", Feedback.class).getResultList();
    }
    
    public static Feedback Feedback.findFeedback(Long id) {
        if (id == null) return null;
        return entityManager().find(Feedback.class, id);
    }
    
    public static List<Feedback> Feedback.findFeedbackEntries(int firstResult, int maxResults) {
        return entityManager().createQuery("SELECT o FROM Feedback o", Feedback.class).setFirstResult(firstResult).setMaxResults(maxResults).getResultList();
    }
    
}
