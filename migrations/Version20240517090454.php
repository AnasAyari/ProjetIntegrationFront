<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240517090454 extends AbstractMigration
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
        $this->addSql('ALTER TABLE command CHANGE user_id user_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE poster DROP command_id');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE command_poster DROP FOREIGN KEY FK_9232C5B133E1689A');
        $this->addSql('ALTER TABLE command_poster DROP FOREIGN KEY FK_9232C5B15BB66C05');
        $this->addSql('DROP TABLE command_poster');
        $this->addSql('ALTER TABLE command CHANGE user_id user_id INT NOT NULL');
        $this->addSql('ALTER TABLE poster ADD command_id INT NOT NULL');
    }
}
