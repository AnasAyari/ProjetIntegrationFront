<?php

namespace App\Entity;

use Symfony\Component\Serializer\Annotation\Groups;
use App\Repository\PosterRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PosterRepository::class)]
class Poster
{
#[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['command'])]
    private ?int $id = null;

    #[ORM\Column]
    #[Groups(['command'])]
    private ?int $quantity = null;

    #[ORM\Column(length: 255)]
    #[Groups(['command'])]
    private ?string $artist = null;

    #[ORM\Column(length: 255)]
    #[Groups(['command'])]
    private ?string $album = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $added_at = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $updated_at = null;

    

    
   
    public function getId(): ?int
    {
        return $this->id;
    }

    public function getQuantity(): ?int
    {
        return $this->quantity;
    }

    public function setQuantity(int $quantity): static
    {
        $this->quantity = $quantity;

        return $this;
    }

    
    public function getArtist(): ?string
    {
    return $this->artist;
    }

    public function setArtist(string $artist): static
    {
        $this->artist = $artist;

        return $this;
    }

   
    public function getAlbum(): ?string
    {
        return $this->album;
    }

    public function setAlbum(string $album): static
    {
        $this->album = $album;

        return $this;
    }

    public function getAddedAt(): ?\DateTimeImmutable
    {
        return $this->added_at;
    }

    public function setAddedAt(\DateTimeImmutable $added_at): static
    {
        $this->added_at = $added_at;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeImmutable
    {
        return $this->updated_at;
    }

    public function setUpdatedAt(\DateTimeImmutable $updated_at): static
    {
        $this->updated_at = $updated_at;

        return $this;
    }

  
}