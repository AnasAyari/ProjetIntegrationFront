<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240517222237 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE command_poster (command_id INT NOT NULL, poster_id INT NOT NULL, INDEX IDX_9232C5B133E1689A (command_id), INDEX IDX_9232C5B15BB66C05 (poster_id), PRIMARY KEY(command_id, poster_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE command_poster ADD CONSTRAINT FK_9232C5B133E1689A FOREIGN KEY (command_id) REFERENCES command (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE command_poster ADD CONSTRAINT FK_9232C5B15BB66C05 FOREIGN KEY (poster_id) REFERENCES poster (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE command ADD user_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE command ADD CONSTRAINT FK_8ECAEAD4A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_8ECAEAD4A76ED395 ON command (user_id)');
        $this->addSql('ALTER TABLE message ADD user_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE message ADD CONSTRAINT FK_B6BD307FA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_B6BD307FA76ED395 ON message (user_id)');
        $this->addSql('ALTER TABLE post ADD user_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE post ADD CONSTRAINT FK_5A8A6C8DA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_5A8A6C8DA76ED395 ON post (user_id)');
        $this->addSql('ALTER TABLE user DROP is_admin');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE command_poster DROP FOREIGN KEY FK_9232C5B133E1689A');
        $this->addSql('ALTER TABLE command_poster DROP FOREIGN KEY FK_9232C5B15BB66C05');
        $this->addSql('DROP TABLE command_poster');
        $this->addSql('ALTER TABLE command DROP FOREIGN KEY FK_8ECAEAD4A76ED395');
        $this->addSql('DROP INDEX IDX_8ECAEAD4A76ED395 ON command');
        $this->addSql('ALTER TABLE command DROP user_id');
        $this->addSql('ALTER TABLE message DROP FOREIGN KEY FK_B6BD307FA76ED395');
        $this->addSql('DROP INDEX IDX_B6BD307FA76ED395 ON message');
        $this->addSql('ALTER TABLE message DROP user_id');
        $this->addSql('ALTER TABLE post DROP FOREIGN KEY FK_5A8A6C8DA76ED395');
        $this->addSql('DROP INDEX IDX_5A8A6C8DA76ED395 ON post');
        $this->addSql('ALTER TABLE post DROP user_id');
        $this->addSql('ALTER TABLE user ADD is_admin TINYINT(1) NOT NULL');
    }
}
